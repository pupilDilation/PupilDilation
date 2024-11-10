// ConcertInfo.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./ConcertInfo.module.css";

function ConcertInfo({ title, id }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.buttonContainer}>
        <Link to={`/reservations/${id}`}>
          <button className={styles.scannerButton}>Show Reservations</button>
        </Link>
        <Link to={`/editdetail/${id}`}>
          <button className={styles.editButton}>Edit Concert</button>
        </Link>
        <Link to={`/scanner/${id}`}>
          <button className={styles.scannerButton}>Scanner</button>
        </Link>
      </div>
    </div>
  );
}

export default ConcertInfo;
