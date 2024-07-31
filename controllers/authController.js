const authModel = require("../models/authModel");

async function getUserByUserId(req, res) {
  try {
    const users = await authModel.getUserByUserId();
    if (users.length < 1) {
      throw new Error("No Such User");
    }
    res.json(users[0]);
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}

module.exports = {
  getUserByUserId,
};
