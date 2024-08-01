const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM user WHERE user_id = ?", [
      userId,
    ]);
    if (rows.length > 0) {
      // username 과 일치하는 user 찾으면
      const user = rows[0]; // username은 unique 하기 때문에 0번째 원소가 user가 될 것
      console.log(user);
      // password 올바른지 체크 (bcrypt로 암호화된 password에 대해 user.password와 비교)
      const isPwMatch = await bcrypt.compare(password, user.user_pw);
      if (isPwMatch) {
        req.session.userId = user.user_id;
        req.session.userType = user.user_type;
        return res.json({ success: true });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        detail: error.message,
      });
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid username" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      detail: error.message,
    });
    console.error(error.message);
  }
});

router.post("/register", async (req, res) => {
  const { id, name, password, email, phone } = req.body;

  // password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [ids] = await db.query(
      `
      SELECT * FROM user WHERE user_id = ?
      `,
      [id]
    );
    if (ids.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Id already exist error" });
    }

    await db.query(
      `INSERT INTO user (user_id, user_name, user_pw, user_email, user_phone, user_type) VALUES (?,?,?,?,?,?)`,
      [id, name, hashedPassword, email, phone, "user"]
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/checkauth", (req, res) => {
  // userId 있는 경우 response 로 authenticated : true, 유저아이디 전달
  console.log(req.session);
  if (req.session.userId) {
    return res.json({
      authenticated: true,
      userId: req.session.userId,
      userType: req.session.userType,
    });
  }
  return res.json({ authenticated: false });
});

router.post("/logout", (req, res) => {
  // session destroy
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true });
  });
});

module.exports = router;
