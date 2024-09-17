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

async function getUserById(req, res) {
  try {
    const user_id = req.params.user_id;
    const users = await userModel.getUserById(user_id);
    if (users.length < 1) {
      return res.status(404).json({ error: "No such user." });
    }
    res.json(users[0]);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error });
  }
}

async function getAdmins(req, res) {
  try {
    const admins = await userModel.getAdmins();
    if (admins.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Found." });
    } else {
      res.json(admins);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  getUsers,
  getUserById,
  getAdmins,
};
