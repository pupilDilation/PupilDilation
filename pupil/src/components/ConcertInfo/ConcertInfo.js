// ConcertInfo.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConcertInfo.module.css";

function ConcertInfo({ title, id }) {
  const navigate = useNavigate();

  const handleReservationListClick = () => {
    navigate(`/reservations/${id}`);
  };

  const handleEditDetailClick = () => {
    navigate(`/editdetail/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.buttonContainer}>
        <button
          className={styles.scannerButton}
          onClick={handleReservationListClick}
        >
          Show Reservations
        </button>
        <button className={styles.editButton} onClick={handleEditDetailClick}>
          Edit Concert
        </button>
      </div>
    </div>
  );
}

export default ConcertInfo;
