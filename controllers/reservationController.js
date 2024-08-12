const reservationModel = require("../models/reservationModel");

const getReservationByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const reservations = await reservationModel.getReservationByUserId(user_id);
    if (reservations.length > 0) {
      return res.json({ success: true, reservations });
    } else {
      return res.status(404).json({
        success: false,
        message: "No reservations found for the given user ID",
      });
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", detail: error.message });
  }
};

module.exports = {
  getReservationByUserId,
};
