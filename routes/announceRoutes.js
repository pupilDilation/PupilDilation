const express = require("express");
const announceController = require("../controllers/announceController");

const router = express.Router();

router.get("/all", announceController.getAllAnnounce);
router.get("/3month", announceController.getAnnounce3MonthDesc);
router.post("/newannounce", announceController.postAnnouncement);

module.exports = router;
