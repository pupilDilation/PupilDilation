import React, { useState, useEffect } from "react";
import "./DetailContentMobile.css";
import axios from "axios";

function DetailForm() {
  const [concert, setConcert] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const concertId = "1";

  useEffect(() => {
    const fetchConcertDetails = async () => {
      try {
        const concertResponse = await axios.get(`/${concertId}`);
        setConcert(concertResponse.data);

        const sessionsResponse = await axios.get(
          `/concerts/${concertId}/sessions`
        );
        setSessions(sessionsResponse.data);

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

  const { title, image, price, place, introduction } = concert;

  const introductionLength = introduction.length;
  const marginBottom =
    introductionLength > 100
      ? "calc(100vw * 60 / 400)"
      : "calc(100vw * 40 / 400)";

  return (
    <div className="detail-container-mobile">
      <p className="event-title-mobile">{title}</p>
      <div>
        <div className="first-detail-mobile">
          {image ? (
            <img className="event-image-mobile" src={image} alt={title} />
          ) : (
            <img src="hello.png" alt={title} />
          )}
          <div className="second-detail-mobile">
            <div>
              <p className="content-title">가격</p>
              <p className="content-text">{price}원</p>
            </div>
            <div>
              <p className="content-title">장소</p>
              <p className="content-text">{place}</p>
            </div>
            <div>
              <p className="content-title">공연기간</p>
              <p className="content-text">2024.07.01~2024.07.15</p>
            </div>
          </div>
        </div>
        <div className="third-detail-mobile">
          <div>
            <p className="content-intro">소개</p>
            <p className="intro-text">{introduction}</p>
          </div>
          <div style={{ marginBottom }}>
            <p className="content-title">공연일정</p>
            <p className="schedule-text">
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <div key={session.session_id}>
                    {new Date(session.session_date).toLocaleDateString()}
                    <br />
                  </div>
                ))
              ) : (
                <span>세션 정보가 없습니다.</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailForm;
