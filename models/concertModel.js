const db = require("../config/dbConfig");

/**
 * 상영 예정이 7일 이내로 남은 session의 concert_id와 session_date 가져오기
 */
const getCurrentConcerts = async () => {
  const [rows] = await db.query(
    "SELECT concert_id session_date FROM session WHERE concert_id = @concert_id AND session_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7' DAY;"
  );
  return rows;
};
