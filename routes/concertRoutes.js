const express = require("express");
const concertController = require("../controllers/concertController");

const router = express.Router();

router.get("/", concertController.getConcerts);
router.get(`/:concert_id`, concertController.getConcertById);

router.post("/concert", concertController.postConcert);
// router.post("/session", concertController.postSession);

router.put("/concert/:concert_id", concertController.putConcert);
router.delete("/concert/:concert_id", concertController.deleteConcert);
module.exports = router;
