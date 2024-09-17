const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:user_id", userController.getUserById);
router.get("/admins/get", userController.getAdmins);

module.exports = router;
