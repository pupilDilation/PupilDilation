const db = require("../config/dbConfig");

async function getAllAnnouncement() {
  const [rows] = await db.query(`SELECT * FROM announcement`);

  return rows;
}

module.exports = {
  getAllAnnouncement,
};
