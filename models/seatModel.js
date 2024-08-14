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
    `SELECT c.concert_row, c.concert_col, c.concert_location
     FROM concert c 
     JOIN session s ON c.concert_id = s.concert_id 
     WHERE s.session_id = ?`,
    [sessionId]
  );
  return rows[0];
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
};
