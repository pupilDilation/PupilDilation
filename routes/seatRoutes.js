const express = require("express");
const seatController = require("../controllers/seatController");

const router = express.Router();

router.get("/concert/:concertId", seatController.getSeatByConcertId);
router.get("/session/:sessionId", seatController.getSeatBySessionId);

module.exports = router;
