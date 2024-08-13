const db = require("../config/dbConfig");

async function getAllAnnouncement() {
  const [rows] = await db.query(`SELECT * FROM announcement`);

  return rows;
}

async function getAnnounce3MonthDesc() {
  const [rows] = await db.query(`
    SELECT *
    FROM announcement
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
    ORDER BY created_at DESC
    `);
  return rows;
}

async function postAnnouncement(title, content) {
  const [result] = await db.query(
    `
    INSERT INTO announcement (announce_title, announce_content)
    VALUES (?, ?)`,
    [title, content]
  );
  return result;
}

module.exports = {
  getAllAnnouncement,
  getAnnounce3MonthDesc,
  postAnnouncement,
};
