import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import SeatStyle from "./Seat.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCol,
  setRow,
  clearSelectedSeats,
  toggleSeat,
} from "../../slice/seatSlice";
import SeatSelectSection from "./SeatSelectSection";
import axios from "axios";
import Button from "../Button/Button";
import SeatTypeInfo from "./SeatTypeInfo";

function SeatSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const concertId = useSelector((state) => state.concert.selectedConcertId);
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const [seats, setSeats] = useState([]);
  const { sessionId } = useParams();
  const [concert_location, setLocation] = useState("");

  const row = useSelector((state) => state.seat.row);
  const col = useSelector((state) => state.seat.col);

  useEffect(() => {
    async function getSeatsBySessionId() {
      try {
        const response = await axios.get(
          `http://localhost:3001/seats/session/${sessionId}`
        );
        const { success, seats, concert_row, concert_col, concert_location } =
          response.data;

        if (success) {
          dispatch(setRow(concert_row));
          dispatch(setCol(concert_col));
          setSeats(seats);
          setLocation(concert_location);
        } else {
          throw new Error("Failed to fetch seats data");
        }
      } catch (error) {
        console.error("Error fetching seats data: ", error);
        alert("좌석 정보를 불러오는데 실패했습니다.");
        navigate("/");
      }
    }
    //세션이 존재할 경우 세션 id를 이용하여 좌석 정보 불러옴
    if (sessionId) {
      getSeatsBySessionId();
    }
  }, [concertId, sessionId, dispatch]);

  useEffect(() => {
    document.documentElement.style.setProperty("--row", row);
    document.documentElement.style.setProperty("--col", col);
  }, [row, col]);

  //세션 id값이 없거나 row col이 0이라 불러올 좌석 정보가 없을 경우
  if (!sessionId || (row === 0 && col === 0)) {
    return <div>Loading...</div>;
  }
  //좌석이 선택되었을 때
  const handleSeatSelect = (seatNumber) => {
    dispatch(toggleSeat(seatNumber));
  };
  //결제하기 버튼을 클릭했을 때
  const handlePaymentClick = async () => {
    if (selectedSeats.length === 0) {
      alert("좌석을 선택해주세요.");
      return;
    }
    try {
      for (const seatNumber of selectedSeats) {
        await axios.put(`http://localhost:3001/seats/session/${sessionId}`, {
          seatNumber,
          seatStatus: "reserved",
        });
      }
      const response = await axios.get(
        `http://localhost:3001/seats/session/${sessionId}`
      );
      const { success, seats } = response.data;

      if (success) {
        setSeats(seats);
        dispatch(clearSelectedSeats());
        alert("결제가 완료되었습니다.");
      } else {
        throw new Error("Failed to update seat information");
      }
      navigate("/");
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
      alert("결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={SeatStyle.seatWrapper}>
      <div className={SeatStyle.seatTitle}>좌석 선택</div>
      <div className={SeatStyle.stageTitle}>{concert_location}</div>
      <div className={SeatStyle.screen}>
        <h2>STAGE</h2>
      </div>
      <div className={SeatStyle.seatSection}>
        <div className={SeatStyle.seatGrid}>
          {Array.from({ length: row * col }, (_, index) => {
            const seatNumber = index + 1;
            const seatInfo =
              seats.find((seat) => seat.seat_number === seatNumber) || {};
            return (
              <Seat
                key={seatNumber}
                seatNumber={seatNumber}
                seatStatus={seatInfo.seat_status || "available"}
                onSelect={handleSeatSelect}
              />
            );
          })}
        </div>
        <SeatSelectSection />
      </div>
      <SeatTypeInfo />
      <Button
        className={SeatStyle.paymentClickBtn}
        onClick={handlePaymentClick}
      >
        결제하기
      </Button>
    </div>
  );
}

export default SeatSelection;
