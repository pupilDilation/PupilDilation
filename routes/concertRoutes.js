const express = require("express");
const concertController = require("../controllers/concertController");

const router = express.Router();

router.get("/", concertController.getUpcomingConcerts);

module.exports = router;
