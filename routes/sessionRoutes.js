const express = require("express");
const concertController = require("../controllers/sessionController");

const router = express.Router();

router.get("/concerts/:concertId/sessions", sessionController.getSession);
// router.post("/session", concertController.postSession);

module.exports = router;
