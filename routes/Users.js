const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", (req, res) => {
  res.send("Hello World");
});

// async keyword 사용
router.post("/", async (req, res) => {
  const post = req.body;
  await Users.create(post);
});

module.exports = router;
