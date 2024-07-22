const db = require("../config/dbConfig");

/**
 * 상영 예정이 7일 이내로 남은 session의 concert_id와 session_date 가져오기
 */
const getCurrentConcerts = async () => {
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
        AND s.session_date <= DATE_ADD(NOW(), INTERVAL 1 WEEK)
        AND c.deleted_at IS NULL
        AND s.deleted_at IS NULL
    ORDER BY 
        s.session_date;
    `);
  return rows;
};

module.exports = {
  getCurrentConcerts,
};
