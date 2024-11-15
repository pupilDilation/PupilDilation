import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import SeatStyle from "./Seat.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCol, setRow, toggleSeat } from "../../slice/seatSlice";
import SeatSelectSection from "./SeatSelectSection";
import axios from "axios";
import Button from "../Button/Button";
import SeatTypeInfo from "./SeatTypeInfo";

function SeatSelection({ isAdmin = false, onAdminSelect }) {
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
          `http://cndlsrb2739.iptime.org:3000/seats/session/${sessionId}`
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
  }, [concertId, sessionId, dispatch, navigate]);

  useEffect(() => {
    document.documentElement.style.setProperty("--row", row);
    document.documentElement.style.setProperty("--col", col);
  }, [row, col]);

  //좌석이 선택되었을 때
  const handleSeatSelect = async (seatNumber) => {
    if (isAdmin) {
      onAdminSelect(seatNumber);
    } else {
      dispatch(toggleSeat(seatNumber));
    }
  };
  //세션 id값이 없거나 row col이 0이라 불러올 좌석 정보가 없을 경우
  if (!sessionId || (row === 0 && col === 0)) {
    return <div>Loading...</div>;
  }

  //결제하기 버튼을 클릭했을 때
  const handleReserveClick = async () => {
    if (selectedSeats.length === 0) {
      alert("좌석을 선택해주세요.");
      return;
    }
    try {
      //예매 완료했을 경우 disabled로 변경 -> 결제 완료시에 reserved로 변경
      for (const seatNumber of selectedSeats) {
        await axios.put(
          `http://cndlsrb2739.iptime.org:3000/seats/session/${sessionId}`,
          {
            seatNumber,
            seatStatus: "progress",
          }
        );
      }
      const response = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/seats/session/${sessionId}`
      );
      const { success, seats } = response.data;

      if (success) {
        setSeats(seats);
        // dispatch(clearSelectedSeats());
        navigate(`/concert/${concertId}/sessions/${sessionId}/seats/payment`);
        alert("예매가 완료되었습니다.");
      } else {
        throw new Error("Failed to update seat information");
      }
    } catch (error) {
      console.error("예매 처리 중 오류 발생:", error);
      alert("예매 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      navigate("/");
    }
  };

  return (
    <div className={SeatStyle.seatWrapper}>
      {!isAdmin && <div className={SeatStyle.seatTitle}>좌석 선택</div>}
      <div className={SeatStyle.stageTitle}>{concert_location}</div>
      <div className={SeatStyle.screen}>
        <h2>STAGE</h2>
      </div>
      <div className={SeatStyle.seatSection}>
        <div className={SeatStyle.seatGrid}>
          {seats.map((seat) => (
            <Seat
              key={seat.seat_number}
              seatNumber={seat.seat_number}
              seatStatus={seat.seat_status}
              onSelect={handleSeatSelect}
              isAdmin={isAdmin}
              isSelected={selectedSeats.includes(seat.seat_number)}
            />
          ))}
        </div>
        {!isAdmin && <SeatSelectSection />}
      </div>
      <SeatTypeInfo />
      {!isAdmin && (
        <Button
          className={SeatStyle.reserveClickBtn}
          onClick={handleReserveClick}
        >
          예매하기
        </Button>
      )}
    </div>
  );
}

export default SeatSelection;
