import React, { useState, useEffect } from "react";
import "./EditDetailDesign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImgInput from "../ImgInput/ImgInput"; // Import the ImgInput component

function EditDetailForm({ concertId }) {
  const [newShowInfo, setNewShowInfo] = useState({
    title: "",
    introduction: "",
    place: "",
    price: "",
    concert_row: "",
    concert_col: "",
  });

  const [imgUrl, setImgUrl] = useState(""); // State to manage the image URL
  const [sessionDates, setSessionDates] = useState([]);
  const [deletedSessions, setDeletedSessions] = useState([]);
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConcertData() {
      try {
        const concertRes = await axios.get(
          `http://localhost:3001/concerts/${concertId}`
        );
        const concertData = concertRes.data[0];

        const sessionRes = await axios.get(
          `http://localhost:3001/sessions/${concertId}/session`
        );
        const fetchedSessions = sessionRes.data.map((session) => ({
          session_id: session.session_id,
          session_date: session.session_date.replace(" ", "T").slice(0, 16),
        }));

        setNewShowInfo({
          title: concertData.concert_title || "",
          introduction: concertData.concert_plot || "",
          place: concertData.concert_location || "",
          price: concertData.concert_price || "",
          concert_row: concertData.concert_row || "",
          concert_col: concertData.concert_col || "",
        });

        setImgUrl(concertData.concert_img || ""); // Set the image URL if available
        setSessionDates(fetchedSessions);
        setUserData(concertData.user_id);
      } catch (error) {
        console.error("Failed to fetch concert data:", error);
      }
    }

    fetchConcertData();
  }, [concertId]);

  const handleInputChange = (e) => {
    setNewShowInfo({ ...newShowInfo, [e.target.name]: e.target.value });
  };

  const handleSessionDateChange = (index, value) => {
    const updatedSessions = [...sessionDates];
    updatedSessions[index].session_date = value;
    setSessionDates(updatedSessions);
  };

  const addSessionDate = () => {
    setSessionDates([...sessionDates, { session_date: "", session_id: null }]);
  };

  const removeSessionDate = (index) => {
    const updatedSessions = [...sessionDates];
    const removedSession = updatedSessions.splice(index, 1)[0];

    if (removedSession.session_id) {
      setDeletedSessions([...deletedSessions, removedSession.session_id]);
    }

    setSessionDates(updatedSessions);
  };

  const convertDateFormat = (dateTime) => dateTime.replace("T", " ") + ":00";

  // Function to handle updating the concert and session details separately
  const updateConcertAndSessions = async () => {
    try {
      // Update concert details
      await axios.put(`http://localhost:3001/concerts/${concertId}`, {
        concert_title: newShowInfo.title,
        concert_location: newShowInfo.place,
        concert_price: newShowInfo.price,
        concert_plot: newShowInfo.introduction,
        concert_row: newShowInfo.concert_row,
        concert_col: newShowInfo.concert_col,
        concert_img: imgUrl, // Include the image URL when updating concert
        user_id: userData,
      });

      // Update existing sessions, add new sessions, and delete marked sessions
      for (const session of sessionDates) {
        if (session.session_id) {
          await axios.put(
            `http://localhost:3001/sessions/${concertId}/${session.session_id}`,
            { session_date: convertDateFormat(session.session_date) }
          );
        } else {
          await axios.post(
            `http://localhost:3001/sessions/${concertId}/session`,
            { session_date: convertDateFormat(session.session_date) }
          );
        }
      }

      // Delete sessions that are marked for deletion
      for (const sessionId of deletedSessions) {
        await axios.delete(
          `http://localhost:3001/sessions/${concertId}/${sessionId}`
        );
      }

      alert("성공적으로 업데이트되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("업데이트 실패:", error.response?.data || error.message);
      alert(
        `업데이트에 실패했습니다. 오류 메시지: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="host-create-container">
      <div className="host-create-right">
        <label htmlFor="title" className="host-create-input-title">
          공연 제목
        </label>
        <input
          className="host-create-title"
          type="text"
          name="title"
          placeholder="공연 제목 입력"
          value={newShowInfo.title}
          onChange={handleInputChange}
        />

        <label htmlFor="introduction" className="host-create-input-title">
          공연 소개
        </label>
        <textarea
          className="host-create-introduction-content"
          name="introduction"
          placeholder="소개 입력"
          value={newShowInfo.introduction}
          onChange={handleInputChange}
        />

        <label htmlFor="place" className="host-create-input-title">
          공연 장소
        </label>
        <input
          className="select-place"
          type="text"
          name="place"
          placeholder="장소 입력"
          value={newShowInfo.place}
          onChange={handleInputChange}
        />

        <label htmlFor="price" className="host-create-input-title">
          공연 가격
        </label>
        <input
          className="host-create-price-content"
          type="number"
          name="price"
          placeholder="가격 입력"
          value={newShowInfo.price}
          onChange={handleInputChange}
        />

        <label htmlFor="concert_row" className="host-create-input-title">
          공연 Row 수
        </label>
        <input
          className="host-create-row-content"
          type="number"
          name="concert_row"
          placeholder="Rows"
          value={newShowInfo.concert_row}
          onChange={handleInputChange}
        />

        <label htmlFor="concert_col" className="host-create-input-title">
          공연 Column 수
        </label>
        <input
          className="host-create-col-content"
          type="number"
          name="concert_col"
          placeholder="Columns"
          value={newShowInfo.concert_col}
          onChange={handleInputChange}
        />

        <label htmlFor="concert_img" className="host-create-input-title">
          공연 이미지
        </label>
        <ImgInput imgUrl={imgUrl} setImgUrl={setImgUrl} />

        <div className="session-dates">
          <p>세션 날짜</p>
          {sessionDates.map((session, index) => (
            <div className="session-date" key={index}>
              <label htmlFor={`session-datetime-${index}`}>
                {index + 1} 공연
              </label>
              <input
                id={`session-datetime-${index}`}
                type="datetime-local"
                value={session.session_date}
                onChange={(e) => handleSessionDateChange(index, e.target.value)}
              />
              <button
                className="delete-button"
                onClick={() => removeSessionDate(index)}
              >
                제거
              </button>
            </div>
          ))}
          <button className="event-add-button" onClick={addSessionDate}>
            세션 추가
          </button>
        </div>

        <button
          onClick={updateConcertAndSessions}
          className="host-create-button"
        >
          업데이트 하기
        </button>
      </div>
    </div>
  );
}

export default EditDetailForm;
