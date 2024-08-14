const db = require("../config/dbConfig");

const getSessions = async (concertId) => {
  const [rows] = await db.query(
    `SELECT * FROM session WHERE concert_id = ? AND deleted_at IS NULL`,
    [concertId]
  );
  return rows;
};

const getSessionById = async (concertId, sessionId) => {
  const [rows] = await db.query(
    `SELECT * FROM session WHERE concert_id = ? AND session_id = ? AND deleted_at IS NULL`,
    [concertId, sessionId]
  );
  return rows[0];
};

const postSession = async (sessionData) => {
  const { session_date, concert_id } = sessionData;

  try {
    // Insert the session into the session table
    const [sessionResult] = await db.query(
      `
      INSERT INTO session (session_date, concert_id)
      VALUES (?, ?)`,
      [session_date, concert_id]
    );

    const newSessionId = sessionResult.insertId;

    // Retrieve the row and col values from the concert table
    const [concert] = await db.query(
      "SELECT concert_row, concert_col FROM concert WHERE concert_id = ?",
      [concert_id]
    );

    if (concert.length === 0) {
      throw new Error("Concert not found");
    }

    const { concert_row: row, concert_col: col } = concert[0];

    // Create an array of seats for the new session
    const seats = [];
    for (let i = 1; i <= row * col; i++) {
      seats.push([newSessionId, `${i}`, "available"]);
    }

    // Batch insert seats
    await db.query(
      "INSERT INTO seat (session_id, seat_number, seat_status) VALUES ?",
      [seats]
    );

    return {
      session_id: newSessionId,
      session_date,
      concert_id,
    };
  } catch (error) {
    console.error("Error creating session or seats:", error);
    throw error;
  }
};

const putSession = async (concertId, sessionId, sessionData) => {
  const { session_date } = sessionData;
  const [result] = await db.query(
    `UPDATE session SET session_date = ? WHERE concert_id = ? AND session_id = ? AND deleted_at IS NULL`,
    [session_date, concertId, sessionId]
  );
  return result;
};

const deleteSession = async (concertId, sessionId) => {
  const [seatsResult] = await db.query(
    `UPDATE seat SET deleted_at = NOW() WHERE session_id = ?`,
    [sessionId]
  );

  const [sessionResult] = await db.query(
    `UPDATE session SET deleted_at = NOW() WHERE concert_id = ? AND session_id = ?`,
    [concertId, sessionId]
  );

  return {
    sessionResult,
    seatsResult,
  };
};

const getSessionBySessionId = async (sessionId) => {
  const [rows] = await db.query(
    `SELECT * FROM session WHERE session_id = ? AND deleted_at IS NULL`,
    [sessionId]
  );
  return rows[0];
};

module.exports = {
  getSessions,
  getSessionById,
  postSession,
  putSession,
  deleteSession,
  getSessionBySessionId,
};
