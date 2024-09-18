import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConcertInfo.module.css";

function ConcertInfo({ title, id }) {
  const navigate = useNavigate();

  const handleReservationListClick = () => {
    // Navigate to the ReservationListPage with the concertId as a route parameter
    navigate(`/reservations/${id}`);
  };

  return (
    <div className={styles.container} onClick={handleReservationListClick}>
      <h1 className={styles.title}>{title}</h1>
      <button className={styles.scannerButton}>Show Reservations</button>
    </div>
  );
}

export default ConcertInfo;
