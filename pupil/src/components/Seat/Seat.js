import React, { useState } from "react";
import seatStyle from "./Seat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "../../slice/seatSlice";

const Seat = ({ seatNumber, style }) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const isReserved = selectedSeats.includes(seatNumber);

  const handleClick = () => {
    dispatch(toggleSeat(seatNumber));
  };

  return (
    <div
      className={`${seatStyle.seat} ${
        isReserved ? seatStyle.reserved : seatStyle.available
      }`}
      onClick={handleClick}
      style={style}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
