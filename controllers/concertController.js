const concertModel = require("../models/concertModel");

const getUpcomingConcerts = async (req, res) => {
  try {
    const upcomingConcerts = await concertModel.getCurrentConcerts();
    res.json(upcomingConcerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

module.exports = {
  getUpcomingConcerts,
};
