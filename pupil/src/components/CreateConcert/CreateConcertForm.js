import React, { useState } from "react";
import styles from "./CreateConcert.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import SeatSetter from "./SeatSetter";

function CreateConcertForm() {
  // redux store에서 user id state 가져오기
  const userId = useSelector((state) => state.login.id);

  // SeatSetter 에 전달할 전체 좌석 배열 state
  const [seats, setSeats] = useState([]);

  //initial state
  const initialState = {
    concert_title: "",
    concert_location: "",
    concert_price: "",
    concert_row: "",
    concert_col: "",
    concert_img: "",
    concert_plot: "",
    user_id: "",
    rsv_start_at: "",
    rsv_end_at: "",
    session_dates: [""],
  };

  // inputForm state로 concert detail data state를 한번에 관리
  const [inputForm, setInputForm] = useState(initialState);

  // input태그의 name props 이름을 통해서 inputForm obj의 해당 값 변경하도록 설정
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // session_dates의 경우 동적 할당을 위해 onChange 함수를 따로 설정
  // session-dates의 배열을 복사하도록 함
  const handleSessionDateChange = (index, value) => {
    const newSessionDates = [...inputForm.session_dates];
    newSessionDates[index] = value;
    setInputForm((prev) => ({
      ...prev,
      session_dates: newSessionDates,
    }));
  };

  // session 추가, 삭제
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

  // js datetime format을 mysql의 datetime으로 변환하는 formatter
  function convertDateFormat(dateTime) {
    return dateTime.replace("T", " ") + ":00";
  }

  async function register(e) {
    try {
      const res = await axios.post("http://localhost:3001/concerts", {
        concertData: {
          concert_title: inputForm.concert_title,
          concert_location: inputForm.concert_location,
          concert_price: inputForm.concert_price,
          concert_row: inputForm.concert_row,
          concert_col: inputForm.concert_col,
          concert_img: inputForm.concert_img,
          concert_plot: inputForm.concert_plot,
          user_id: userId,
          rsv_start_at: convertDateFormat(inputForm.rsv_start_at),
          rsv_end_at: convertDateFormat(inputForm.rsv_end_at),
        },
        sessionsData: inputForm.session_dates,
        seatsData: seats,
      });
      if (res.status === 500) {
        alert("공연 생성 실패");
      }
      if (res.status === 201) {
        alert(`${inputForm.concert_title} 생성 성공!`);
        setInputForm(initialState);
      }
    } catch (error) {
      console.log(error);
      alert("공연생성 실패 : " + error);
    }
  }

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
          <input
            type="text"
            placeholder="공연 제목 입력"
            name="concert_title"
            value={inputForm.concert_title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="장소 입력"
            name="concert_location"
            value={inputForm.concert_location}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="가격 입력 (원)"
            name="concert_price"
            value={inputForm.concert_price}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightInputBox}>
          <textarea
            cols="30"
            rows="10"
            placeholder="공연 설명 입력"
            name="concert_plot"
            value={inputForm.concert_plot}
            onChange={handleChange}
          ></textarea>
          <p>예매 시작 시간</p>
          <input
            type="datetime-local"
            name="rsv_start_at"
            value={inputForm.rsv_start_at}
            onChange={handleChange}
          />
          <p>예매 종료 시간</p>
          <input
            type="datetime-local"
            name="rsv_end_at"
            value={inputForm.rsv_end_at}
            onChange={handleChange}
          />
          <div className={styles.sessionDates} id="sessionDateBox">
            <p>Session Dates</p>
            {inputForm.session_dates.map((date, index) => (
              <div className={styles.sessionDateBox} key={index}>
                <label htmlFor={`session-datetime-${index}`}>
                  {index + 1} 공연
                </label>
                <input
                  id={`session-datetime-${index}`}
                  type="datetime-local"
                  value={date}
                  onChange={(e) =>
                    handleSessionDateChange(index, e.target.value)
                  }
                />
                <button onClick={() => removeSessionDate(index)}>
                  세션 제거
                </button>
              </div>
            ))}
            <div className={styles.sessionControlBox}>
              <button onClick={addSessionDate}>세션 추가</button>
            </div>
          </div>
          <div className={styles.seatSetter}>
            <p>비활성화 할 좌석 선택</p>
            <div className={styles.seatController}>
              <input
                name="concert_row"
                type="number"
                value={inputForm.concert_row}
                placeholder="rows"
                onChange={handleChange}
              />
              <input
                name="concert_col"
                type="number"
                value={inputForm.concert_col}
                placeholder="cols"
                onChange={handleChange}
              />
            </div>
            <SeatSetter
              rows={inputForm.concert_row}
              cols={inputForm.concert_col}
              seats={seats}
              setSeats={setSeats}
            ></SeatSetter>
          </div>
          <button className={styles.submitBtn} onClick={register}>
            공연 추가!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateConcertForm;
