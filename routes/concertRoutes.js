const express = require("express");
const concertController = require("../controllers/concertController");

const router = express.Router();

router.get("/", concertController.getConcerts);
router.get("/range", concertController.getConcertsInRange);
router.get("/:concert_id", concertController.getConcertById);
router.get("/user/:user_id", concertController.getConcertsByUserId);
router.get("/get/concertbytitle", concertController.getConcertsByConcertName);
router.post("/", concertController.createConcert);
router.put("/:concert_id", concertController.putConcert);
router.delete("/:concert_id", concertController.deleteConcert);

module.exports = router;
