const express = require("express");
const router = express.Router();
const { Concerts } = require("../models");

router.get("/", (req, res) => {
  res.send("Hello World");
});

// async keyword 사용
router.post("/", async (req, res) => {
  const post = req.body;
  await Concerts.create(post);
});

module.exports = router;
