const concertModel = require("../models/concertModel");
const clubModel = require("../models/clubModel");
const sessionModel = require("../models/sessionModel");
const seatModel = require("../models/seatModel");
const pool = require("../config/dbConfig");

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

const getConcertsByClubId = async (req, res) => {
  const { club_id } = req.params;
  try {
    const userId = await clubModel.getUserByClubId(club_id);
    if (userId.affectedRows < 1) {
      return res.json({
        success: false,
        message: "Club Connected with User Not Found.",
      });
    }
    console.log(userId);
    const concerts = await concertModel.getConcertsByUserId(userId);
    if (concerts.affectedRows < 1) {
      return res.json({ success: false, message: "Concerts Not Found." });
    }
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
    if (concerts.affectedRows < 1) {
      return res.json({ success: false, message: "Concerts Not Found." });
    }
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch concerts for the user." });
  }
};

const getConcertsByConcertName = async (req, res) => {
  const { concert_title } = req.query;
  try {
    const concerts = await concertModel.getConcertsByConcertName(concert_title);
    if (concerts.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "Concerts Not Found." });
    }
    res.json(concerts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

const createConcert = async (req, res) => {
  console.log(req.body);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction(); // transaction을 이용

    const { concertData, sessionsData, seatsData } = req.body;

    // create concert
    const concertId = await concertModel.createConcert(concertData);

    // create sessions
    const sessionIds = await sessionModel.createSessions(
      concertId,
      sessionsData
    );

    // create seats of each session
    await seatModel.createSeats(sessionIds, seatsData);

    await connection.commit();
    res.status(201).json({ concertId, sessionIds });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
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
  putConcert,
  deleteConcert,
  getConcertById,
  getConcertsInRange,
  getConcertsByUserId,
  getConcertsByConcertName,
  createConcert,
  getConcertsByClubId,
};
