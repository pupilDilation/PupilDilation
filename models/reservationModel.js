const db = require("../config/dbConfig");

const getReservationByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT rsv_id, user_id, session_id, seat_id, payment_status FROM reservation WHERE user_id = ?",
    [userId]
  );
  return rows;
};

module.exports = {
  getReservationByUserId,
};
