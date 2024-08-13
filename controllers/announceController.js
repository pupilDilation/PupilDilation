const announceModel = require("../models/announceModel");

const getAllAnnounce = async (req, res) => {
  try {
    const announcements = await announceModel.getAllAnnouncement();
    if (announcements.length < 1) {
      return res
        .status(404)
        .json({ suceess: false, message: "Announcement Not Found." });
    }

    res.json(announcements);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const getAnnounce3MonthDesc = async (req, res) => {
  try {
    const announcements = await announceModel.getAnnounce3MonthDesc();
    if (announcements.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement Not Found" });
    }
    return res.json(announcements);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const postAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await announceModel.postAnnouncement(title, content);
    if (result.affectedRows > 0) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Announce Not Found." });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllAnnounce,
  getAnnounce3MonthDesc,
  postAnnouncement,
};
