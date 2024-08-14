const sessionModel = require("../models/sessionModel");

const getSessions = async (req, res) => {
  const concertId = req.params.concert_id;
  try {
    const sessions = await sessionModel.getSessions(concertId);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sessions." });
  }
};

const getSessionById = async (req, res) => {
  const { concert_id, session_id } = req.params;
  try {
    const session = await sessionModel.getSessionById(concert_id, session_id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      concert_id,
      session_id,
    }); //debugging
  }
};

const postSession = async (req, res) => {
  const concertId = req.params.concert_id;
  const sessionData = { ...req.body, concert_id: concertId };
  try {
    const result = await sessionModel.postSession(sessionData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putSession = async (req, res) => {
  const { concert_id, session_id } = req.params;
  const sessionData = req.body;
  try {
    const result = await sessionModel.putSession(
      concert_id,
      session_id,
      sessionData
    );
    if (result.affectedRows > 0) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Session not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update session." });
  }
};

const deleteSession = async (req, res) => {
  const { concert_id, session_id } = req.params;
  try {
    const result = await sessionModel.deleteSession(concert_id, session_id);
    if (result.sessionResult.affectedRows > 0) {
      res.json({
        success: true,
        message: "Session and associated seats marked as deleted.",
        sessionUpdate: result.sessionResult,
        seatsUpdate: result.seatsResult,
      });
    } else {
      res.status(404).json({ error: "Session not found." });
    }
  } catch (error) {
    console.error("Failed to delete session:", error);
    res.status(500).json({ error: "Failed to delete session." });
  }
};

const getSessionBySessionId = async (req, res) => {
  const { session_id } = req.params;
  try {
    const session = await sessionModel.getSessionBySessionId(session_id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ error: "Session not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch session." });
  }
};

module.exports = {
  getSessions,
  getSessionById,
  postSession,
  putSession,
  deleteSession,
  getSessionBySessionId,
};
