const db = require("../config/dbConfig");

/**
 * 모든 동아리 정보 가져오기
 */
const getClubs = async () => {
  const [rows] = await db.query(`
    SELECT 
      *
    FROM 
      club
    ORDER BY
      club_id;
  `);
  return rows;
};

/**
 * 특정 동아리 정보 가져오기
 */
const getClubById = async (clubId) => {
  const [rows] = await db.query(
    `
    SELECT 
    *
    FROM 
      club
    WHERE 
      club_id = ? AND
      deleted_at IS NULL
  `,
    [clubId]
  );
  return rows;
};

const getClubsByClubName = async (clubName) => {
  const [rows] = await db.query(
    `
    SELECT * FROM club 
    WHERE club_name LIKE ?
    OR club_search LIKE ?
    ORDER BY club_name
    `,
    [`%${clubName}%`, `%${clubName}%`]
  );
  return rows;
};

/**
 * 클럽에 공연 정보 추가하기
 */
const addConcertToClub = async (concertData) => {
  const {
    concert_id,
    concert_title,
    concert_location,
    concert_price,
    concert_row,
    concert_col,
    concert_img,
    concert_plot,
    user_id,
  } = concertData;

  const [result] = await db.query(
    `
    INSERT INTO concerts (concert_id, concert_title, concert_location, concert_price, concert_row, concert_col, concert_img, concert_plot, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      concert_id,
      concert_title,
      concert_location,
      concert_price,
      concert_row,
      concert_col,
      concert_img,
      concert_plot,
      user_id,
    ]
  );

  return result;
};
const getConcertsByUserId = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      concert_id,
      concert_title,
      concert_location,
      concert_price,
      concert_row,
      concert_col,
      concert_img,
      concert_plot,
      created_at,
      updated_at,
      deleted_at
    FROM
      concert
    WHERE
      user_id = ? AND
      deleted_at IS NULL
    ORDER BY
      created_at;
  `,
    [userId]
  );
  return rows;
};

const getUserByClubId = async (clubId) => {
  const [rows] = await db.query(`SELECT user_id FROM club WHERE club_id = ?`, [
    clubId,
  ]);

  return rows;
};

async function createClubAccount(connection, id, name, pw, email, phone) {
  const [result] = await connection.query(
    "INSERT INTO user (user_id, user_name, user_pw, user_email, user_phone, user_type) VALUES (?,?,?,?,?,?)",
    [id, name, pw, email, phone, "admin"]
  );

  return result;
}

async function connectAdmin(connection, id, name, description, search) {
  const [result] = await connection.query(
    "INSERT INTO club (club_name, club_description, user_id, club_search) VALUES (?,?,?,?)",
    [name, description, id, search]
  );

  return result;
}

module.exports = {
  getClubs,
  getClubById,
  addConcertToClub,
  getConcertsByUserId,
  getClubsByClubName,
  getUserByClubId,
  createClubAccount,
  connectAdmin,
};
