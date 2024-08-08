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

const updateSeatStatus = async (req, res) => {
  const { sessionId } = req.params;
  console.log("Request body:", req.body);
  const { seatStatus, seatNumber } = req.body;
  try {
    await seatModel.updateSeatStatus(sessionId, seatNumber, seatStatus);
    return res.json({
      success: true,
      message: "Seat status updated successfully",
      param: sessionId,
      body: { seatNumber, seatStatus },
    });
  } catch (error) {
    console.error("Error updating seat status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", detail: error.message });
  }
};

module.exports = {
  getSeatByConcertId,
  getSeatBySessionId,
  updateSeatStatus,
};
