const clubModel = require("../models/clubModel");
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");

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
    return res.json(clubs);
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

const createClub = async (req, res) => {
  console.log(req.body);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction(); // transaction 사용하여 club과 admin account 동시 세팅
    const { id, password, name, email, phone, description, search } = req.body;
    const hashedPassword = await bcrypt.hash(password);

    const result = await clubModel.createClubAccount(
      connection,
      id,
      name,
      password,
      email,
      phone
    );
    if (result.affectedRows < 1) {
      throw new Error("error occurred: creating club account is canceled.");
    }
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getClubs,
  getClubById,
  getConcertsByUserId,
  addConcertToClub,
  getClubsByClubName,
  createClub,
};
