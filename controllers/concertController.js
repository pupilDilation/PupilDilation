const concertModel = require("../models/concertModel");

const getUpcomingConcerts = async (req, res) => {
  try {
    const upcomingConcerts = await concertModel.getCurrentConcerts();
    res.json(upcomingConcerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

const postConcert = async (req, res) => {
  try {
    const concertData = req.body;
    const result = await concertModel.postConcert(concertData);
    res.status(201).json({ message: "Concert added successfully.", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add concert.", details: error.message });
  }
};

const postSession = async (req, res) => {
  try {
    const sessionData = req.body;
    const result = await concertModel.postSession(sessionData);
    res.status(201).json({ message: "Session added successfully.", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add session.", details: error.message });
  }
};

const putConcert = async (req, res) => {
  try {
    const concertId = req.params.concert_id;
    const concertData = req.body;

    const result = await concertModel.putConcert(concertId, concertData);
    res.status(200).json({ message: "Concert updated successfully.", result });
  } catch (error) {
    console.error("Error updating concert:", error); // Log error details
    res
      .status(500)
      .json({ error: "Failed to update concert.", details: error.message });
  }
};

const deleteConcert = async (req, res) => {
  try {
    const concertId = req.params.concert_id;
    const result = await concertModel.deleteConcert(concertId);
    res.status(200).json({ message: "Concert deleted successfully.", result });
  } catch (error) {
    console.error("Error deleting concert:", error); // Log error details
    res
      .status(500)
      .json({ error: "Failed to delete concert.", details: error.message });
  }
};

module.exports = {
  getUpcomingConcerts,
  postConcert,
  postSession,
  putConcert,
  deleteConcert,
};
