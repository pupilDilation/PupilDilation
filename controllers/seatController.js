// controllers/seatController.js
const seatModel = require("../models/seatModel");

const getSeatByConcertId = async (req, res) => {
  const { concertId } = req.params;
  try {
    const rows = await seatModel.getSeatByConcertId(concertId);
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
};

const getSeatBySessionId = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const rows = await seatModel.getSeatBySessionId(sessionId);
    if (rows.length > 0) {
      return res.json({ success: true, seats: rows });
    } else {
      return res.status(404).json({
        success: false,
        message: "Seats not found for the given session",
      });
    }
  } catch (error) {
    console.error("Error fetching seats data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", detail: error.message });
  }
};

module.exports = {
  getSeatByConcertId,
  getSeatBySessionId,
};
