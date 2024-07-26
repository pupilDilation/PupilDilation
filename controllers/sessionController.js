const concertModel = require("../models/sessionModel");

const getSession = async (req, res) => {
  const concertId = req.params.concertId;
  try {
    const sessions = await sessionModel.getSession(concertId);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

// const postSession = async (req, res) => {
//   try {
//     const sessionData = req.body;
//     const result = await concertModel.postSession(sessionData);
//     res.status(201).json({ message: "Session added successfully.", result });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to add session.", details: error.message });
//   }
// };

module.exports = {
  getSession,
};
