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
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllAnnounce,
};
