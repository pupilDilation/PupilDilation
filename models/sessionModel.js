const db = require("../config/dbConfig");

const getSessions = async (concertId) => {
  const [rows] = await db.query(
    `SELECT * FROM tbsession WHERE concert_id = ? AND deleted_at IS NULL`,
    [concertId]
  );
  return rows;
};

const getSessionById = async (concertId, sessionId) => {
  const [rows] = await db.query(
    `SELECT * FROM tbsession WHERE concert_id = ? AND session_id = ? AND deleted_at IS NULL`,
    [concertId, sessionId]
  );
  return rows[0];
};

const postSession = async (sessionData) => {
  const { session_id, session_date, concert_id } = sessionData;
  const [result] = await db.query(
    `
    INSERT INTO session (session_id, session_date, concert_id)
    VALUES (?, ?, ?)`,
    [session_id, session_date, concert_id]
  );
  return result;
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
  const [result] = await db.query(
    `UPDATE session SET deleted_at = NOW() WHERE concert_id = ? AND session_id = ?`,
    [concertId, sessionId]
  );
  return result;
};

module.exports = {
  getSessions,
  getSessionById,
  postSession,
  putSession,
  deleteSession,
};
