import React from "react";
import seatStyle from "./Seat.module.css";
import { useSelector } from "react-redux";

function Seat({ seatNumber, seatStatus, onSelect }) {
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const isSelected = selectedSeats.includes(seatNumber);

  const handleClick = () => {
    if (seatStatus !== "reserved" && seatStatus !== "disabled") {
      onSelect(seatNumber);
    }
  };

  let seatClass = seatStyle.available;
  if (seatStatus === "reserved") {
    seatClass = seatStyle.reserved;
  } else if (seatStatus === "disabled") {
    seatClass = seatStyle.disabled;
  } else if (isSelected) {
    seatClass = seatStyle.selected;
  } else if (seatStatus === "progress") {
    seatClass = seatStyle.progress;
  }

  return (
    <div className={`${seatStyle.seat} ${seatClass}`} onClick={handleClick}>
      {seatNumber}
    </div>
  );
}

export default Seat;
