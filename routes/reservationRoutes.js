const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.get("/:user_id", reservationController.getReservationByUserId);

module.exports = router;
