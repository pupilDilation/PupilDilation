import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ConcertInfo.module.css";

function ConcertInfo({ title, concert, id }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button className={styles.scannerButton}>
        <Link to={`/scanner/${id}`}>Go to Scanner</Link>
      </button>
    </div>
  );
}

export default ConcertInfo;
