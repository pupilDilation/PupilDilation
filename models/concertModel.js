const db = require("../config/dbConfig");

/**
 * 상영 예정이 7일 이내로 남은 session의 concert_id와 session_date 가져오기
 */
const getConcerts = async () => {
  const [rows] = await db.query(`
    SELECT 
      c.concert_id,
      c.concert_title, 
      c.concert_location,
      c.concert_price,
      c.concert_row,
      c.concert_col, 
      c.concert_img,
      c.concert_plot, 
      c.created_at, 
      c.updated_at, 
      c.deleted_at, 
      c.user_id,
      s.session_id,
      s.session_date
    FROM 
        concert c
    JOIN 
        session s ON c.concert_id = s.concert_id
    WHERE 
        s.session_date >= NOW()
        AND s.session_date <= DATE_ADD(NOW(), INTERVAL 4 WEEK)
        AND c.deleted_at IS NULL
        AND s.deleted_at IS NULL
    ORDER BY 
        s.session_date;
    `);
  return rows;
};

const getConcertById = async (concertId) => {
  const [concert] = await db.query(
    `SELECT * FROM tbconcert WHERE concert_id = ?`,
    [concertId]
  );
  return concert;
};

const postConcert = async (concertData) => {
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
    INSERT INTO concert (concert_id, concert_title, concert_location, concert_price, concert_row, concert_col, concert_img, concert_plot, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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

const putConcert = async (concertId, concertData) => {
  const {
    concert_title,
    concert_location,
    concert_price,
    concert_row,
    concert_col,
    concert_img,
    concert_plot,
    user_id,
  } = concertData;

  try {
    const [result] = await db.query(
      `
      UPDATE concert 
      SET 
        concert_title = ?,
        concert_location = ?,
        concert_price = ?,
        concert_row = ?,
        concert_col = ?,
        concert_img = ?,
        concert_plot = ?,
        user_id = ?
      WHERE concert_id = ?`,
      [
        concert_title,
        concert_location,
        concert_price,
        concert_row,
        concert_col,
        concert_img,
        concert_plot,
        user_id,
        concertId,
      ]
    );
    return result;
  } catch (error) {
    console.error("Database error:", error); // Log error details
    throw error; // Rethrow to be caught by the controller
  }
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

const deleteConcert = async (concertId) => {
  try {
    const [result] = await db.query(
      `
      UPDATE concert 
      SET deleted_at = NOW()
      WHERE concert_id = ?`,
      [concertId]
    );
    return result;
  } catch (error) {
    console.error("Database error:", error); // Log error details
    throw error; // Rethrow to be caught by the controller
  }
};

module.exports = {
  getConcerts,
  postConcert,
  postSession,
  putConcert,
  deleteConcert,
  getConcertById,
};
