const express = require("express");
const db = require("../config/dbConfig");
const router = express.Router();

router.get("/:concertId", async (req, res) => {
  const { concertId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT concert_row, concert_col FROM concert WHERE concert_id = ?",
      [concertId]
    );
    if (rows.length > 0) {
      const { concert_row, concert_col } = rows[0];
      return res.json({ concert_col, concert_row });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "concert not found" });
    }
  } catch (error) {
    console.error("error from fetching concert data", error);
    return res
      .status(500)
      .json({ success: false, message: "server error", detail: error.message });
  }
});

module.exports = router;
