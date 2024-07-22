const concertModel = require("../models/concertModel");

const getUpcomingConcerts = async (req, res) => {
  try {
    const upcomingConcerts = await concertModel.getCurrentConcerts();
    res.json(upcomingConcerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

const addConcert = async (req, res) => {
  try {
    const concertData = req.body;
    const result = await concertModel.addConcert(concertData);
    res.status(201).json({ message: "Concert added successfully.", result });
  } catch (error) {
    res.status(500).json({ error: "Failed to add concert." });
  }
};

const addSession = async (req, res) => {
  try {
    const sessionData = req.body;
    const result = await concertModel.addSession(sessionData);
    res.status(201).json({ message: "Session added successfully.", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add session.", details: error.message });
  }
};

module.exports = {
  getUpcomingConcerts,
  addConcert,
  addSession,
};
