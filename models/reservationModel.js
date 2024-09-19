const db = require("../config/dbConfig");

const getReservationByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT rsv_id, user_id, session_id, seat_id, payment_status FROM reservation WHERE user_id = ?",
    [userId]
  );
  return rows;
};

const postReservationByUserId = async (
  userId,
  sessionId,
  seatId,
  paymentStatus,
  rsv_uuid
) => {
  const [result] = await db.query(
    "INSERT INTO reservation (user_id, session_id, seat_id, payment_status, rsv_uuid ) VALUES (?, ?, ?, ?, ?)",
    [userId, sessionId, seatId, paymentStatus, rsv_uuid]
  );
  return {
    user_id: userId,
    session_id: sessionId,
    seat_id: seatId,
    payment_status: paymentStatus,
  };
};

const putReservationByUserId = async (
  userId,
  rsvId,
  sessionId,
  seatId,
  paymentStatus
) => {
  const [result] = await db.query(
    "UPDATE reservation SET session_id = ?, seat_id = ?, payment_status = ? WHERE user_id = ? AND rsv_id = ?",
    [sessionId, seatId, paymentStatus, userId, rsvId]
  );
  return result.affectedRows > 0;
};

const deleteReservationByUserId = async (userId, rsvId) => {
  const [result] = await db.query(
    "UPDATE reservation SET deleted_at = NOW() WHERE user_id = ? AND rsv_id = ? AND deleted_at IS NULL",
    [userId, rsvId]
  );
  return result;
};

const checkReservation = async (rsvUUID) => {
  const [result] = await db.query(
    "SELECT rsv_id FROM reservation WHERE rsv_uuid = ?",
    [rsvUUID]
  );
  return result;
};

const getReservationBySessionId = async (sessionId) => {
  const [rows] = await db.query(
    "SELECT rsv_id, user_id, seat_id, payment_status FROM reservation WHERE session_id = ?",
    [sessionId]
  );
  return rows;
};

const getSessionByUUID = async (uuid) => {
  const [rows] = await db.query(
    "SELECT session_id FROM reservation WHERE rsv_uuid = ?",
    [uuid]
  );
  return rows[0];
};

const getConcertBySessionId = async (sessionId) => {
  const [rows] = await db.query(
    "SELECT concert_id FROM session WHERE session_id = ?",
    [sessionId]
  );
  return rows[0];
};

module.exports = {
  getReservationByUserId,
  postReservationByUserId,
  putReservationByUserId,
  deleteReservationByUserId,
  checkReservation,
  getReservationBySessionId,
  getSessionByUUID,
  getConcertBySessionId,
};
