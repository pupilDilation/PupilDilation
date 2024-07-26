const db = require("../config/dbConfig");

/**
 * 상영 예정이 7일 이내로 남은 session의 concert_id와 session_date 가져오기
 */

const getSession = async (concertId) => {
  conse[rows] = await db.query(
    `SELECT * FROM tbsession WHERE concert_id = ? AND deleted_at IS NULL`,
    [concertId]
  );
  return rows;
};

// const postSession = async (sessionData) => {
//   const { session_id, session_date, concert_id } = sessionData;
//   const [result] = await db.query(
//     `
//     INSERT INTO session (session_id, session_date, concert_id)
//     VALUES (?, ?, ?)`,
//     [session_id, session_date, concert_id]
//   );
//   return result;
// };

module.exports = {
  getSession,
};
