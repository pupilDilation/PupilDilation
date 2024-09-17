const express = require("express");
const clubController = require("../controllers/clubController");

const router = express.Router();

/**
 * 동아리 목록 가져오기
 * 동아리 id로 동아리 정보 가져오기
 * 동아리 id로 공연정보 가져오기
 * 동아리 id로 공연 추가하기
 * 동아리 id로 동아리 삭제하기
 */
router.get("/", clubController.getClubs);

router.get("/clubid/:club_id", clubController.getClubById);

router.get("/:user_id", clubController.getConcertsByUserId);

router.get("/get/clubbyname", clubController.getClubsByClubName);

router.post("/:user_id", clubController.addConcertToClub);

router.post("/create/club", clubController.createClub);

module.exports = router;
