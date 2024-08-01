const db = require("../config/dbConfig");

/**
 * user_id 로 user 조회 함수
 */
async function getUserByUserId() {
  const [rows] = await db.query(
    `
    SELECT * FROM user WHERE user_id = ?
    `,
    [user_id]
  );
  return rows;
}

module.exports = {
  getUserByUserId,
};
