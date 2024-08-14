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
    const seats = await seatModel.getSeatBySessionId(sessionId);
    const concertInfo = await seatModel.getConcertInfoBySessionId(sessionId);

    if (seats.length > 0 && concertInfo) {
      return res.json({
        success: true,
        seats: seats,
        concert_row: concertInfo.concert_row,
        concert_col: concertInfo.concert_col,
        concert_location: concertInfo.concert_location,
      });
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
  const { seatStatus, seatNumber } = req.body;
  const updatedSeats = await seatModel.getSeatBySessionId(sessionId);
  try {
    await seatModel.updateSeatStatus(sessionId, seatNumber, seatStatus);
    return res.json({
      success: true,
      message: "Seat status updated successfully",
      seats: updatedSeats,
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
