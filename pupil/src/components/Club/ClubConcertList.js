import { useQuery } from "@tanstack/react-query";
import styles from "./ClubDetail.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ClubConcertList() {
  const { clubId } = useParams();

  async function getConcertsByClubId() {
    try {
      const res = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/concerts/club/${clubId}`
      );
      console.log(res);
      if (res.data.success) {
        return res.data;
      }
      throw new Error("data fetch failed");
    } catch (error) {
      console.log(error);
    }
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["clubId", clubId],
    queryFn: () => getConcertsByClubId(),
  });

  return (
    <div className={styles.clubConcertListContainer}>
      {!data ? (
        <div>No Concerts</div>
      ) : (
        <div className={styles.concertListGridContainer}>
          {data.map((concert, index) => (
            <div key={index} className={styles.concertCard}>
              {concert.concert_title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClubConcertList;
