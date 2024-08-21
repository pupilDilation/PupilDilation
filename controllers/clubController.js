const clubModel = require("../models/clubModel");

// 모든 동아리 정보 가져오기
const getClubs = async (req, res) => {
  try {
    const clubs = await clubModel.getClubs();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

// 특정 동아리 정보 가져오기
const getClubById = async (req, res) => {
  const { club_id } = req.params;
  try {
    const club = await clubModel.getClubById(club_id);
    if (!club) {
      res.status(404).json({ error: "Club not found" });
    } else {
      res.json(club);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch club" });
  }
};

// 특정 동아리의 공연정보 가져오기
const getConcertsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const concerts = await clubModel.getConcertsByUserId(user_id);
    res.json(concerts);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch concerts by club id",
      detail: err.message,
    });
  }
};

const getClubsByClubName = async (req, res) => {
  const { club_name } = req.query;
  try {
    const clubs = await clubModel.getClubsByClubName(club_name);
    if (clubs.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "Clubs Not Found." });
    }
    res.json(clubs);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch clubs by club name",
      detail: error.message,
    });
  }
};

//동아리에 공연 정보 추가하기
const addConcertToClub = async (req, res) => {
  try {
    const concertData = {
      ...req.body,
      club_id: req.params.club_id,
    };
    const result = await clubModel.addConcertToClub(concertData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add concert to club" });
  }
};

module.exports = {
  getClubs,
  getClubById,
  getConcertsByUserId,
  addConcertToClub,
  getClubsByClubName,
};
