const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.get("/:concert_id/session", sessionController.getSessions);
router.get("/:concert_id/:session_id", sessionController.getSessionById);
router.post("/:concert_id/session", sessionController.postSession);
router.put("/:concert_id/:session_id", sessionController.putSession);
router.delete("/:concert_id/:session_id", sessionController.deleteSession);

router.get("/:session_id", sessionController.getSessionBySessionId);

module.exports = router;
