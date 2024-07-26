const concertModel = require("../models/concertModel");

const getConcerts = async (req, res) => {
  try {
    const concerts = await concertModel.getConcerts();
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

const getConcertById = async (req, res) => {
  const { concertId } = req.params;

  try {
    // Fetch concert details by ID
    const concert = await concertModel.getConcertById(concertId);

    if (concert.length === 0) {
      return res.status(404).json({ error: "Concert not found." });
    }

    // Fetch sessions for the concert
    const sessions = await sessionModel.getSessionsByConcertId(concertId);

    // Send concert details and sessions as response
    res.json({
      concert: concert[0],
      sessions,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concert details." });
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
  getConcerts,
  postConcert,
  postSession,
  putConcert,
  deleteConcert,
  getConcertById,
};
