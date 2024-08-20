const concertModel = require("../models/concertModel");

const getConcerts = async (req, res) => {
  try {
    const concerts = await concertModel.getConcerts();
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

const getConcertsInRange = async (req, res) => {
  const { endDays } = req.query;
  try {
    const concerts = await concertModel.getConcertsInRange(parseInt(endDays));
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts in range." });
  }
};

const getConcertById = async (req, res) => {
  const concertId = req.params.concert_id;
  try {
    const concert = await concertModel.getConcertById(concertId);
    if (concert) {
      res.json(concert);
    } else {
      res.status(404).json({ error: "Concert not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the concert." });
  }
};

const getConcertsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const concerts = await concertModel.getConcertsByUserId(user_id);
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts for the user." });
  }
};

const postConcert = async (req, res) => {
  const concertData = req.body;
  try {
    const result = await concertModel.postConcert(concertData);
    res.status(201).json({ message: "Concert added successfully.", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add concert.", details: error.message });
  }
};

const putConcert = async (req, res) => {
  const concertId = req.params.concert_id;
  const concertData = req.body;
  try {
    const result = await concertModel.putConcert(concertId, concertData);
    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Concert updated successfully.", result });
    } else {
      res.status(404).json({ error: "Concert not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update concert.", details: error.message });
  }
};

const deleteConcert = async (req, res) => {
  const concertId = req.params.concert_id;
  try {
    const result = await concertModel.deleteConcert(concertId);
    if (result.affectedRows > 0) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Concert not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete concert." });
  }
};

module.exports = {
  getConcerts,
  postConcert,
  putConcert,
  deleteConcert,
  getConcertById,
  getConcertsInRange,
  getConcertsByUserId,
};
