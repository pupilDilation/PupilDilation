import React, { useEffect, useState } from "react";
import SeatSelectionSectionStyle from "./SeatSelectSection.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";

function SeatSelectSection() {
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const col = useSelector((state) => state.seat.col);
  const { concertId } = useParams();
  const [concertInfo, setConcertInfo] = useState(null);

  useEffect(() => {
    const fetchConcertInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/concerts/${concertId}`
        );
        if (response.data && response.data.length > 0) {
          setConcertInfo(response.data[0]);
        } else {
          console.error("No concert data found");
        }
      } catch (error) {
        console.error("Error fetching concert info: ", error);
      }
    };
    fetchConcertInfo();
  }, [concertId]);

  const formatSeatNumber = (seatNumber) => {
    const rowIndex = Math.floor((seatNumber - 1) / col);
    const colIndex = (seatNumber - 1) % col;
    const rowLetter = String.fromCharCode(65 + rowIndex);
    return `${rowLetter}${colIndex + 1}`;
  };

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
          Total{" "}
          {concertInfo ? selectedSeats.length * concertInfo.concert_price : 0}
        </div>
      </div>
    </div>
  );
}

export default SeatSelectSection;
