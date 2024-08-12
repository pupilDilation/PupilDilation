require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cra2024.2048@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});
