import React from "react";
import { Link } from "react-router-dom";
import styles from "./ConcertInfo.module.css";

function ConcertInfo({ title, id }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.buttonBox}>
        <Link to={`/reservations/${id}`}>
          <button className={styles.showReservationBtn}>예매 현황</button>
        </Link>
        <Link to={`/scanner/${id}`}>
          <button className={styles.showReservationBtn}>Scanner</button>
        </Link>
      </div>
    </div>
  );
}

export default ConcertInfo;
