import React, { useEffect, useState } from "react";
import styles from "./ClubDetail.module.css";

function ClubDetail(props) {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="/img/logo/circle-logo.png" alt="" />
      <div className={styles.descbox}>
        <h1>{props.clubName}</h1>
        <p>{props.clubDesc}</p>
      </div>
    </div>
  );
}

export default ClubDetail;
