import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ConcertInfoStyles from "./ConcertInfo.module.css";

function ConcertInfo(props) {
  const navigate = useNavigate();

  return (
    <div className={ConcertInfoStyles.container}>
      <h1>제목</h1>
      <h1>날짜</h1>
    </div>
  );
}

export default ConcertInfo;
