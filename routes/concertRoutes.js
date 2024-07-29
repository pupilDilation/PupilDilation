const express = require("express");
const concertController = require("../controllers/concertController");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.get("/", concertController.getConcerts);
router.get("/range", concertController.getConcertsInRange);
router.get("/:concert_id", concertController.getConcertById);
router.post("/", concertController.postConcert);
router.put("/:concert_id", concertController.putConcert);
router.delete("/:concert_id", concertController.deleteConcert);

router.get("/:concert_id/session", sessionController.getSessions);
router.get("/:concert_id/:session_id", sessionController.getSessionById);
router.post("/:concert_id/session", sessionController.postSession);
router.put("/:concert_id/:session_id", sessionController.putSession);
router.delete("/:concert_id/:session_id", sessionController.deleteSession);

router.get("/concertByDate");

module.exports = router;
