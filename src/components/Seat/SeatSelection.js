import React from "react";
import Seat from "./Seat";
import SeatStyle from "./Seat.module.css";
import { useSelector } from "react-redux";

const SeatSelection = () => {
  const rows = 5; // 행의 수
  const cols = 10; // 열의 수
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);

  const generateSeats = () => {
    const seats = [];
    let seatNumber = 1;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        seats.push(<Seat key={seatNumber} seatNumber={seatNumber} />);
        seatNumber++;
      }
    }
    return seats;
  };

  return (
    <div className={SeatStyle.seatWrapper}>
      <div className={SeatStyle.screen} />
      <h2>STAGE</h2>
      <div className={SeatStyle.seatSection}>
        <div className={SeatStyle.seatGrid}>{generateSeats()}</div>
        <div className={SeatStyle.selected}>
          {selectedSeats.length} Selected Seats: {selectedSeats.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
