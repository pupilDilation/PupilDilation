import React from "react";
import SeatSelectionSectionStyle from "./SeatSelectSection.module.css";
import { useSelector } from "react-redux";

function SeatSelectSection() {
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const col = useSelector((state) => state.seat.col);

  //좌석 숫자 -=> 알파벳 + 숫자로 변경하는 로직
  const formatSeatNumber = (seatNumber) => {
    const rowIndex = Math.floor((seatNumber - 1) / col);
    const colIndex = (seatNumber - 1) % col;
    const rowLetter = String.fromCharCode(65 + rowIndex);
    return `${rowLetter}${colIndex + 1}`;
  };
  //선택된 좌석들을 한 줄로 모아서 출력하기 위한 변수
  const formattedSeats = selectedSeats.map(formatSeatNumber).join(", ");
  return (
    <div className={SeatSelectionSectionStyle.sectionWrapper}>
      <div className={SeatSelectionSectionStyle.reserveSection}>
        <div className={SeatSelectionSectionStyle.reserveRow}>
          관람인원 {selectedSeats.length}
        </div>
        <div className={SeatSelectionSectionStyle.reserveRow}>
          Selected Seats: {formattedSeats}
        </div>
        <div className={SeatSelectionSectionStyle.reserveRow}>
          Total {selectedSeats.length * 12000}{" "}
        </div>
      </div>
    </div>
  );
}

export default SeatSelectSection;
