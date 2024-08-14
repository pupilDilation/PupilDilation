const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.get("/:user_id", reservationController.getReservationByUserId);

router.post("/:user_id", reservationController.postReservationByUserId);
router.put("/:user_id/:rsv_id", reservationController.putReservationByUserId);
router.delete(
  "/:user_id/:rsv_id",
  reservationController.deleteReservationByUserId
);

module.exports = router;
