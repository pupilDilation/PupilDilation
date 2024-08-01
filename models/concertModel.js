const db = require("../config/dbConfig");

const getConcerts = async () => {
  const [rows] = await db.query(`
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
      deleted_at, 
      user_id
    FROM 
        concert
    WHERE 
        deleted_at IS NULL
    ORDER BY 
        created_at;
  `);
  return rows;
};

const getConcertsInRange = async (endDays) => {
  const [rows] = await db.query(
    `
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
      MIN(s.session_date) as earliest_session_date
    FROM 
        concert c
    JOIN 
        session s ON c.concert_id = s.concert_id
    WHERE 
        s.session_date >= NOW()
        AND s.session_date <= DATE_ADD(NOW(), INTERVAL ? DAY)
        AND c.deleted_at IS NULL
        AND s.deleted_at IS NULL
    GROUP BY 
        c.concert_id
    HAVING 
        MAX(s.session_date) <= DATE_ADD(NOW(), INTERVAL ? DAY)
    ORDER BY 
        earliest_session_date;
  `,
    [endDays, endDays]
  );
  return rows;
};

const getConcertById = async (concertId) => {
  const [concert] = await db.query(
    `SELECT * FROM concert WHERE concert_id = ?`,
    [concertId]
  );
  return concert;
};

const postConcert = async (concertData) => {
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
  const [result] = await db.query(
    `
    INSERT INTO concert (concert_title, concert_location, concert_price, concert_row, concert_col, concert_img, concert_plot, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
  putConcert,
  deleteConcert,
  getConcertById,
  getConcertsInRange,
};
