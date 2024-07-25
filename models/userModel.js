const db = require("../config/dbConfig");

/**
 * 상영 예정이 7일 이내로 남은 session의 concert_id와 session_date 가져오기
 */
const getUsers = async () => {
  const [rows] = await db.query(`
    SELECT * FROM user;
    `);
  return rows;
};

module.exports = {
  getUsers,
};
