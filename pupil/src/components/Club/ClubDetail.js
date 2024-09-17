import React, { useEffect, useState } from "react";
import styles from "./ClubDetail.module.css";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

function ClubDetail() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [clubDetail, setClubDetail] = useState([]);
  async function getClubDetail() {
    try {
      const res = await axios.get(
        `http://localhost:3001/club/clubid/${clubId}`
      );
      if (res.status === 404) {
        alert("존재하지 않는 club입니다!");
        navigate("/");
      } else {
        setClubDetail(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getClubDetail();
  }, []);
  return (
    <div className={styles.container}>
      {!clubDetail.club_img === "" || !clubDetail.club_img === null ? (
        <img src={clubDetail.club_img} alt="club img" />
      ) : (
        <img
          className={styles.img}
          src="/img/logo/circle-logo.png"
          alt="template logo"
        />
      )}

      <div className={styles.descbox}>
        <h1>{clubDetail.club_name}</h1>
        <p>{clubDetail.club_description}</p>
      </div>
    </div>
  );
}

export default ClubDetail;
