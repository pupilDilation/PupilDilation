const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers(); // Corrected model call and variable assignment
    if (users.length < 1) {
      throw new Error("No User.");
    }
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

async function getUserByUsername(req, res) {
  try {
    const users = await userModel.getUserByUsername();
    if (users.length < 1) {
      throw new Error("No such user.");
    }
    res.json(users[0]);
  } catch (error) {}
}

module.exports = {
  getUsers,
};
