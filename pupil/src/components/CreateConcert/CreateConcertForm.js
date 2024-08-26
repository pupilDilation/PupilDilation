import React, { useState } from "react";
import "./CreateConcert.css";
import styles from "./CreateConcert.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFormInput from "../../hooks/useFormInput";

function CreateConcertForm() {
  const [inputForm, setInputForm] = useState({
    concert_title: "",
    concert_location: "",
    concert_price: 0,
    concert_row: 0,
    concert_col: 0,
    concert_img: "",
    concert_plot: "",
    user_id: "",
    rsv_start_at: "",
    rsv_end_at: "",
    session_dates: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSessionDateChange = (index, value) => {
    const newSessionDates = [...inputForm.session_dates];
    newSessionDates[index] = value;
    setInputForm((prev) => ({
      ...prev,
      session_dates: newSessionDates,
    }));
  };

  const addSessionDate = () => {
    setInputForm((prev) => ({
      ...prev,
      session_dates: [...prev.session_dates, ""],
    }));
  };

  const removeSessionDate = (index) => {
    const newSessionDates = inputForm.session_dates.filter(
      (_, i) => i !== index
    );
    setInputForm((prev) => ({
      ...prev,
      session_dates: newSessionDates,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgInputBox}>
          <label htmlFor="imgInput" className={styles.imgInputLabel}>
            <img src="/img/upload-image.png" alt="업로드" />
          </label>
          <input id="imgInput" type="file" className={styles.imgInput} />
        </div>
        <div className={styles.leftInputBox}>
          <input type="text" placeholder="공연 제목 입력" />
          <input type="text" placeholder="장소 입력" />
          <input type="number" placeholder="가격 입력 (원)" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightInputBox}>
          <textarea cols="30" rows="10" placeholder="공연 설명 입력"></textarea>
          <input type="datetime-local" name="rsv_start_at" />
          <input type="datetime-local" name="rsv_end_at" />
          <div className={styles.sessionDates} id="sessionDateBox">
            <p>Session Dates</p>
            {inputForm.session_dates.map((date, index) => (
              <div className={styles.sessionDateBox} key={index}>
                <label htmlFor={`session-datetime-${index}`}>
                  {index + 1} 공연
                </label>
                <input id={`session-datetime-${index}`} type="datetime-local" />
                <button onClick={() => removeSessionDate(index)}>
                  세션 제거
                </button>
              </div>
            ))}
            <div className={styles.sessionControlBox}>
              <button onClick={addSessionDate}>세션 추가</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  //   async function register(e) {
  //     try {
  //       const res = await axios.post("http://localhost:3001/concerts", {
  //         concert_title: newShowInfo.title,
  //         concert_location: newShowInfo.place,
  //         concert_price: newShowInfo.price,
  //         concert_row: 5,
  //         concert_col: 10,
  //         concert_img: null,
  //         concert_plot: newShowInfo.introduction,
  //         user_id: "user2",
  //       });
  //       alert("success!");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}

export default CreateConcertForm;
