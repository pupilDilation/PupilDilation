const db = require("../config/dbConfig");

const getSeatByConcertId = async (concertId) => {
  const [rows] = await db.query(
    "SELECT concert_row, concert_col FROM concert WHERE concert_id = ?",
    [concertId]
  );
  return rows;
};

const getSeatBySessionId = async (sessionId) => {
  const [rows] = await db.query(
    "SELECT seat_id, session_id, seat_status, seat_number FROM seat WHERE session_id = ?",
    [sessionId]
  );
  return rows;
};

const getConcertInfoBySessionId = async (sessionId) => {
  const [rows] = await db.query(
    `
    SELECT c.concert_row, c.concert_col, c.concert_location
    FROM concert c 
    JOIN session s ON c.concert_id = s.concert_id 
    WHERE s.session_id = ?
    `,
    [sessionId]
  );
  return rows[0];
};

const postSeats = async (sessionId, seatArray) => {
  // mysql transaction 을 통한 seat 배엻 처리
  const transactionConnection = await db.beginTransaction();

  try {
    // seat post 전에 해당 session_id로 생성 되었던 seat rows를 제거
    await transactionConnection.query("DELETE FROM seat WHERE session_id = ?", [
      sessionId,
    ]);

    const seatsUpdate = seatArray.map((status, index) => {
      return [sessionId, index + 1, status ? "disabled" : "available"];
    });

    // INSERT new seats
    const [result] = await transactionConnection.query(
      "INSERT INTO seat (session_id, seat_number, seat_status) VALUES ?",
      [seatsUpdate]
    );

    await transactionConnection.commit();
    return result;
  } catch (error) {
    await transactionConnection.rollback();
    throw new Error("Error Occur");
  } finally {
    transactionConnection.release();
  }
};

const createSeats = async (sessionIds, seatsData) => {
  for (const sessionId of sessionIds) {
    const seatValues = seatsData.map((seat, index) => [
      sessionId,
      index + 1,
      seat ? "disabled" : "available",
    ]);

    await db.query(
      `INSERT INTO seat (session_id, seat_number, seat_status) VALUES ?`,
      [seatValues]
    );
  }
};

const updateSeatStatus = async (sessionId, seatNumber, seatStatus) => {
  await db.query(
    "UPDATE seat SET seat_status = ? WHERE session_id = ? AND seat_number = ?",
    [seatStatus, sessionId, seatNumber]
  );
  //업데이트 된 모든 좌석 정보 반환
  const [rows] = await db.query(
    "SELECT seat_id, session_id, seat_status, seat_number FROM seat WHERE session_id = ?",
    [sessionId]
  );
  return rows;
};

module.exports = {
  getSeatByConcertId,
  getSeatBySessionId,
  getConcertInfoBySessionId,
  updateSeatStatus,
  postSeats,
  createSeats,
};
