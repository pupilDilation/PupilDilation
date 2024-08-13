const express = require("express");
const announceController = require("../controllers/announceController");

const router = express.Router();

router.get("/all", announceController.getAllAnnounce);

module.exports = router;
