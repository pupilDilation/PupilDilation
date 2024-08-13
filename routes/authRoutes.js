const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const nodemailer = require("nodemailer");
const { setDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");
const transporter = nodemailer.createTransport({
  service: "gmail",
  logger: true,
  debug: true,
  secure: true,
  port: 465,
  auth: {
    user: "cra2024.2048@gmail.com",
    pass: "yrmm nekh tejf rngy",
  },
});

router.post("/changepassword", async (req, res) => {
  const { uuid, pw } = req.body;

  const hashedPassword = await bcrypt.hash(pw, 10);

  try {
    const [userId] = await db.query(
      "SELECT user_id FROM change_password WHERE uuid = ? ",
      [uuid]
    );

    if (userId.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "No User Found." });
    }

    const [result] = await db.query(
      `UPDATE user SET user_pw = ? WHERE user_id = ?`,
      [hashedPassword, userId[0].user_id]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Password Successfully Changed." });
    } else {
      res.status(404).json({ success: false, message: "User Not Found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.post("/sendmail", async (req, res) => {
  const { userId } = req.body;

  try {
    const [email] = await db.query(
      "SELECT user_email FROM user WHERE user_id = ?",
      [userId]
    );

    if (email.length > 0) {
      const userEmail = email[0].user_email;
      const uuid = uuidv4();

      // change_password 테이블에 비밀번호 변경 인증 uuid 넣기
      await db.query(
        `INSERT INTO change_password (user_id , uuid) VALUES (?,?)`,
        [userId, uuid]
      );

      const mailOption = {
        to: userEmail,
        subject: "[한동아리] 비밀번호 변경 이메일입니다.",
        html: `
        <h2>이메일 메시지입니다.</h2>
        <h4>http://localhost:3000/changepw/${uuid}</h4>
        `,
      };

      await transporter.sendMail(mailOption);
      return res.json({ success: true, message: "Email Successfully Sent" });
    } else {
      return res.json({ success: false, message: "No Email Found." });
    }
  } catch (error) {
    console.error("Error in /sendmail: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

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
        return res.json({ success: true, userType: user.user_type });
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
        .json({ success: false, message: "이미 가입된 ID입니다!" });
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
