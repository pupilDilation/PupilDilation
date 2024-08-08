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

const updateSeatStatus = async (sessionId, seatNumber, seatStatus) => {
  await db.query(
    "UPDATE seat SET seat_status = ? WHERE session_id = ? AND seat_number = ?",
    [seatStatus, sessionId, seatNumber]
  );
};

module.exports = {
  getSeatByConcertId,
  getSeatBySessionId,
  updateSeatStatus,
};
