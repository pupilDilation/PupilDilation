import React from "react";
import SeatSelectionSectionStyle from "./SeatSelectSection.module.css";
import { useSelector } from "react-redux";

function SeatSelectSection() {
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  return (
    <div className={SeatSelectionSectionStyle.sectionWrapper}>
      <div className={SeatSelectionSectionStyle.reserveSection}>
        <div className={SeatSelectionSectionStyle.reserveRow}>
          관람인원 {selectedSeats.length}
        </div>
        <div className={SeatSelectionSectionStyle.reserveRow}>
          Selected Seats: {selectedSeats.join(", ")}
        </div>
        <div className={SeatSelectionSectionStyle.reserveRow}>
          Total {selectedSeats.length * 12000}{" "}
        </div>
      </div>
    </div>
  );
}

export default SeatSelectSection;
