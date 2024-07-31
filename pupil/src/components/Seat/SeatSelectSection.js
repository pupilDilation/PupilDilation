import React from "react";
import Seat from "./Seat";
import SeatSelectionSectionStyle from "./SeatSelectSection.module.css";
import { useSelector } from "react-redux";

function SeatSelectSection() {
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  return (
    <div className={SeatSelectionSectionStyle.sectionWrapper}>
      <div className={SeatSelectionSectionStyle.reserveSection}>
        <p>관람인원 {selectedSeats.length}</p>
        Selected Seats: {selectedSeats.join(", ")}
        <p>Total {selectedSeats.length * 12000} </p>
      </div>
    </div>
  );
}

export default SeatSelectSection;
