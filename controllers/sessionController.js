const concertModel = require("../models/sessionModel");

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
      res.status(404).json({ error: "Session not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the session." });
  }
};

const postSession = async (req, res) => {
  const concertId = req.params.concert_id;
  const sessionData = { ...req.body, concert_id: concertId };
  try {
    const result = await sessionModel.postSession(sessionData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create session." });
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
    if (result.affectedRows > 0) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Session not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete session." });
  }
};

module.exports = {
  getSessions,
  getSessionById,
  postSession,
  putSession,
  deleteSession,
};
