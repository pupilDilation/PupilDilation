import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import styles from "./DetailContentMobile.module.css"; // Import CSS module
import axios from "axios";

function DetailForm() {
  const { concertId } = useParams(); // Get concertId from URL parameters
  const [concert, setConcert] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [performancePeriod, setPerformancePeriod] = useState("");

  useEffect(() => {
    const fetchConcertDetails = async () => {
      try {
        const concertResponse = await axios.get(
          `http://localhost:3001/concerts/${concertId}`
        );
        console.log("Concert Response:", concertResponse.data);
        setConcert(concertResponse.data[0]);

        const sessionsResponse = await axios.get(
          `http://localhost:3001/concerts/${concertId}/session`
        );
        console.log("Sessions Response:", sessionsResponse.data);
        setSessions(sessionsResponse.data);

        if (sessionsResponse.data.length > 0) {
          const dates = sessionsResponse.data.map(
            (session) => new Date(session.session_date)
          );
          const minDate = new Date(Math.min(...dates));
          const maxDate = new Date(Math.max(...dates));

          const formattedMinDate = minDate
            .toISOString()
            .split("T")[0]
            .replace(/-/g, ".");
          const formattedMaxDate = maxDate
            .toISOString()
            .split("T")[0]
            .replace(/-/g, ".");

          setPerformancePeriod(`${formattedMinDate} ~ ${formattedMaxDate}`);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch concert details.");
        setLoading(false);
      }
    };
    fetchConcertDetails();
  }, [concertId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!concert) return <div>No concert data available.</div>;

  const {
    concert_title,
    concert_img,
    concert_price,
    concert_location,
    concert_plot,
  } = concert;

  const handleBookNow = () => {
    alert("Booking functionality is not implemented yet.");
  };

  return (
    <div className={styles.detailContainerMobile}>
      <p className={styles.eventTitleMobile}>{concert_title}</p>
      <div>
        <div className={styles.firstDetailMobile}>
          {concert_img ? (
            <img
              className={styles.eventImageMobile}
              src={concert_img}
              alt={concert_title}
            />
          ) : (
            <img src="hello.png" alt={concert_title} />
          )}
          <div className={styles.secondDetailMobile}>
            <div>
              <p className={styles.contentTitle}>가격</p>
              <p className={styles.contentText}>{concert_price}원</p>
            </div>
            <div>
              <p className={styles.contentTitle}>장소</p>
              <p className={styles.contentText}>{concert_location}</p>
            </div>
            <div>
              <p className={styles.contentTitle}>공연기간</p>
              <p className={styles.contentText}>
                {performancePeriod || "기간 정보 없음"}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.thirdDetailMobile}>
          <div>
            <p className={styles.contentIntro}>소개</p>
            <p className={styles.introText}>{concert_plot}</p>
          </div>
          <div className={styles.scheduleContainer}>
            <p className={styles.contentTitle}>공연일정</p>
            <select
              className={styles.scheduleDropdown}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="" disabled>
                Select a date
              </option>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <option key={session.session_id} value={session.session_date}>
                    {new Date(session.session_date).toLocaleDateString()}
                  </option>
                ))
              ) : (
                <option>No sessions available</option>
              )}
            </select>
          </div>
          <div className={styles.bookNowContainer}>
            <button className={styles.bookNowButton} onClick={handleBookNow}>
              예매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailForm;
