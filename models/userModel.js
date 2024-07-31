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

/**
 * username으로 user 조회
 */
async function getUserByUsername(user_id) {
  const [rows] = await db.query(
    `
    SELECT * FROM user WHERE user_id = ?
    `,
    [user_id]
  );
  return rows;
}

async function createUser(username, password, phone, email) {
  await db.query(
    `
    INSERT INTO user (username, password, phone, email ,user_type ) VALUES (?,?,?,?)
    `,
    [username, password, phone, email, "user"]
  );
}

async function updateUser(user_id, username, password, phone, email) {
  await db.query(
    `
    UPDATE user SET username=?, password=? , phone=?, email=? WHERE user_id = ?
    `,
    [username, password, phone, email, user_id]
  );
}

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
};
