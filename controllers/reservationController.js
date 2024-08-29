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

const postReservationByUserId = async (req, res) => {
  const { user_id } = req.params;
  const { session_id, seat_id, payment_status } = req.body;

  try {
    const newReservation = await reservationModel.postReservationByUserId(
      user_id,
      session_id,
      seat_id,
      payment_status
    );
    return res.status(201).json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", detail: error.message });
  }
};

const putReservationByUserId = async (req, res) => {
  const { user_id, rsv_id } = req.params;
  const { session_id, seat_id, payment_status } = req.body;

  try {
    const updatedReservation = await reservationModel.putReservationByUserId(
      user_id,
      rsv_id,
      session_id,
      seat_id,
      payment_status
    );
    if (updatedReservation) {
      return res.json({ success: true, reservation: updatedReservation });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", detail: error.message });
  }
};

const deleteReservationByUserId = async (req, res) => {
  const { user_id, rsv_id } = req.params;

  try {
    const deletedReservation = await reservationModel.deleteReservationByUserId(
      user_id,
      rsv_id
    );
    if (deletedReservation.affectedRows > 0) {
      return res.json({ success: true, message: "Reservation deleted" });
    } else {
      return res.status(404).json({
        success: false,
        message: "Reservation not found or already deleted",
      });
    }
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", detail: error.message });
  }
};

const checkReservation = async (req, res) => {
  const { rsv_uuid } = req.body;

  try {
    const checkReservation = await reservationModel.checkReservation(rsv_uuid);
    if (checkReservation) {
      return res.json({
        success: true,
        message: "Reservation QR code is vaild",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "UUID not found" });
    }
  } catch (error) {
    console.error("Error checking reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", detail: error.message });
  }
};

module.exports = {
  getReservationByUserId,
  postReservationByUserId,
  putReservationByUserId,
  deleteReservationByUserId,
  checkReservation,
};
