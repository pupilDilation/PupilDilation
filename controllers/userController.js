const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers(); // Corrected model call and variable assignment
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

module.exports = {
  getUsers,
};
