const express = require("express");
const concertController = require("../controllers/concertController");

const router = express.Router();

router.get("/", concertController.getUpcomingConcerts);
router.post("/concert", concertController.addConcert);
router.post("/session", concertController.addSession);

module.exports = router;
