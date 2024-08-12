const express = require("express");
const concertController = require("../controllers/concertController");

const router = express.Router();

router.get("/", concertController.getConcerts);
router.get("/range", concertController.getConcertsInRange);
router.get("/:concert_id", concertController.getConcertById);
router.post("/", concertController.postConcert);
router.put("/:concert_id", concertController.putConcert);
router.delete("/:concert_id", concertController.deleteConcert);

module.exports = router;
