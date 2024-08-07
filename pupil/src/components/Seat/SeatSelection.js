import React, { useEffect } from "react";
import Seat from "./Seat";
import SeatStyle from "./Seat.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCol, setRow } from "../../slice/seatSlice";
import SeatSelectSection from "./SeatSelectSection";
import axios from "axios";

const SeatSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const concertId = useSelector((state) => state.concert.selectedConcertId);
  // const { concertId } = useParams();
  // console.log("concert id: ", concertId);

  const row = useSelector((state) => state.seat.row);
  const col = useSelector((state) => state.seat.col);

  useEffect(() => {
    document.documentElement.style.setProperty("--row", row);
    document.documentElement.style.setProperty("--col", col);
  }, [row, col]);

  useEffect(() => {
    async function getSeatsByConcertId() {
      try {
        const response = await axios.get(
          `http://localhost:3001/seats/concert/${concertId}`
        );
        const { concert_row, concert_col } = response.data;

        //redux 상태 업데이트
        dispatch(setRow(concert_row));
        dispatch(setCol(concert_col));
      } catch (error) {
        console.error("Error fetching seats data: ", error);
      }
    }
    getSeatsByConcertId();
  }, [concertId, dispatch]);

  if (row === 0 && col === 0) {
    return <div>Loading...</div>;
  }

  const handlePaymentClick = () => {
    alert("결제를 완료해야 합니다.");

    //결제 로직 처리 및 데이터 베이스로 데이터 넘기는 부분!

    navigate("/");
  };

  return (
    <div className={SeatStyle.seatWrapper}>
      <div className={SeatStyle.seatTitle}>좌석 선택</div>
      <div className={SeatStyle.stageTitle}>ANH 오디토리움</div>
      <div className={SeatStyle.screen}>
        <h2>STAGE</h2>
      </div>
      <div className={SeatStyle.seatSection}>
        <div className={SeatStyle.seatGrid}>
          {Array.from({ length: row * col }, (_, index) => (
            <Seat key={index + 1} seatNumber={index + 1} />
          ))}
        </div>
        <SeatSelectSection />
        <div className={SeatStyle.seatTypeGrid}></div>
      </div>
      <button onClick={handlePaymentClick}>결제하기</button>
    </div>
  );
};

export default SeatSelection;
