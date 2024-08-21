import React, { useState, useEffect } from "react";
import "./EditDetailDesign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditDetailForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [newShowInfo, setNewShowInfo] = useState({
    title: "",
    introduction: "",
    place: "",
    price: "",
  });
  const [scheduleCount, setScheduleCount] = useState(1);
  const [timeInfo, setTimeInfo] = useState({
    start: {
      date: "",
      time: "",
    },
    end: {
      date: "",
      time: "",
    },
    schedule: [
      {
        date: "",
        time: "",
      },
    ],
  });

  const navigate = useNavigate();

  // Fetch data from API when the component is mounted
  useEffect(() => {
    async function fetchConcertData() {
      try {
        const res = await axios.get("http://localhost:3001/concerts/1");
        const concertData = res.data[0];

        // Update state with fetched data
        setNewShowInfo({
          title: concertData.concert_title,
          introduction: concertData.concert_plot,
          place: concertData.concert_location,
          price: concertData.concert_price,
        });

        // Set schedule data if available
        setTimeInfo({
          start: {
            date: "", // Set this with your start date from database
            time: "", // Set this with your start time from database
          },
          end: {
            date: "", // Set this with your end date from database
            time: "", // Set this with your end time from database
          },
          schedule: [
            {
              date: "2024-05-28", // Replace this with actual schedule date from database
              time: "09:00", // Replace this with actual schedule time from database
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch concert data:", error);
      }
    }

    fetchConcertData();
  }, []);

  const onChangeAccount = (e) => {
    setNewShowInfo({
      ...newShowInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeStartDate = (e) => {
    const newTimeInfo = {
      ...timeInfo,
      start: {
        ...timeInfo.start,
        [e.target.name]: e.target.value,
      },
    };

    setTimeInfo(newTimeInfo);
  };

  const onChangeEndDate = (e) => {
    const newTimeInfo = {
      ...timeInfo,
      end: {
        ...timeInfo.end,
        [e.target.name]: e.target.value,
      },
    };
    setTimeInfo(newTimeInfo);
  };

  const onChangeSchedule = (e) => {
    const newSchedule = timeInfo.schedule;
    newSchedule[Number(e.target.id)] = {
      ...newSchedule[Number(e.target.id)],
      [e.target.name]: e.target.value,
    };

    setTimeInfo({
      ...timeInfo,
      schedule: newSchedule,
    });
  };

  const onSubtractClick = () => {
    if (scheduleCount > 1) {
      setScheduleCount(scheduleCount - 1);
      const newSchedule = [...timeInfo.schedule];
      newSchedule.pop();
      setTimeInfo({
        ...timeInfo,
        schedule: newSchedule,
      });
    }
  };

  const onButtonClick = () => {
    register();
  };

  const schedules = [];
  for (let i = 0; i < scheduleCount; i += 1) {
    schedules.push(
      <div className="host-create-ticket-date-end" id={i} key={i}>
        <div className="host-create-ticket-start-text2">
          {i + 1}공&nbsp;&nbsp;
        </div>
        <div className="host-create-date-end-month">
          <input
            type="date"
            name="date"
            className="select-slection"
            onChange={onChangeSchedule}
            id={i}
            value={timeInfo.schedule[i]?.date || ""}
          />
        </div>
        <div className="host-create-date-end-time">
          <input
            type="time"
            name="time"
            className="select-slection"
            onChange={onChangeSchedule}
            id={i}
            value={timeInfo.schedule[i]?.time || ""}
          />
        </div>
      </div>
    );
  }

  async function register() {
    try {
      const res = await axios.put("http://localhost:3001/concerts/1", {
        concert_title: newShowInfo.title,
        concert_location: newShowInfo.place,
        concert_price: newShowInfo.price,
        concert_row: 5, // Adjust as needed
        concert_col: 10, // Adjust as needed
        concert_img: null, // Handle image upload if needed
        concert_plot: newShowInfo.introduction,
        user_id: "user2", // Replace with actual user ID
      });

      if (res.status === 200 || res.status === 201) {
        alert("성공적으로 업데이트되었습니다!");
        navigate("/"); // Redirect to another page if needed
      } else {
        alert("업데이트에 실패했습니다.");
        console.log(res.status);
      }
    } catch (error) {
      console.error("업데이트 실패:", error.response?.data || error.message);
      alert("업데이트에 실패했습니다.");
    }
  }

  return (
    <div className="host-create-container">
      <div className="host-create-left">
        <input
          type="file"
          className="img-get"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
          accept="image/*"
          multiple
        />
        <img
          src="/images/upload-image.png"
          alt="업로드"
          className="upload-image"
        />
      </div>
      <div className="host-create-right">
        <div className="host-create-right-1">
          <input
            className="host-create-title"
            type="text"
            name="title"
            placeholder="공연 제목 입력"
            onChange={onChangeAccount}
            value={newShowInfo.title}
          />
        </div>
        <div className="host-create-right-2">
          <div className="host-create-right-2-left">
            <div className="host-create-input-title">소개</div>
            <textarea
              className="host-create-introduction-content"
              placeholder="소개 입력"
              name="introduction"
              onChange={onChangeAccount}
              value={newShowInfo.introduction}
            />
          </div>
          <div className="host-create-right-2-right">
            <div className="host-create-place">
              <div className="host-create-input-title">장소</div>
              <input
                type="text"
                name="place"
                className="host-create-price-content"
                placeholder="장소 입력"
                onChange={onChangeAccount}
                value={newShowInfo.place}
              />
            </div>
            <div className="host-create-price">
              <div className="host-create-input-title">가격</div>
              <input
                className="host-create-price-content"
                type="number"
                step="500"
                placeholder="가격 입력"
                name="price"
                onChange={onChangeAccount}
                value={newShowInfo.price}
              />
            </div>
          </div>
        </div>
        <div className="host-create-right-3">
          <div className="host-create-ticket-date">
            <div className="host-create-input-title">예매일정</div>
            <div className="host-create-ticket-date-end">
              <div className="host-create-ticket-start-text2">시작</div>
              <div className="host-create-date-start">
                <input
                  type="date"
                  name="date"
                  className="select-slection"
                  onChange={onChangeStartDate}
                  value={timeInfo.start.date}
                />
                <div className="host-create-ticket-start-text">날짜</div>
              </div>
              <div className="host-create-date-start-time">
                <input
                  type="time"
                  name="time"
                  className="select-slection"
                  onChange={onChangeStartDate}
                  value={timeInfo.start.time}
                />
                <div className="host-create-ticket-start-text">시간</div>
              </div>
            </div>
            <div className="host-create-ticket-date-end">
              <div className="host-create-ticket-start-text2">마감</div>
              <div className="host-create-date-end">
                <input
                  type="date"
                  name="date"
                  className="select-slection"
                  onChange={onChangeEndDate}
                  value={timeInfo.end.date}
                />
                <div className="host-create-ticket-start-text">날짜</div>
              </div>
              <div className="host-create-date-end-time">
                <input
                  type="time"
                  name="time"
                  className="select-slection"
                  onChange={onChangeEndDate}
                  value={timeInfo.end.time}
                />
                <div className="host-create-ticket-start-text">시간</div>
              </div>
            </div>
            <div className="host-create-input-title">공연일정</div>
            <div className="event-function">
              <div className="event-schedules">{schedules}</div>
            </div>
          </div>
          <div className="host-create-add-buttons">
            <div className="event-add-button-div">
              <button
                type="button"
                onClick={() => {
                  setScheduleCount(scheduleCount + 1);
                  const newScheduleItem = {
                    date: "",
                    time: "",
                  };
                  const newSchedule = [...timeInfo.schedule, newScheduleItem];
                  const newTimeInfo = {
                    ...timeInfo,
                    schedule: newSchedule,
                  };

                  setTimeInfo(newTimeInfo);
                }}
                className="event-add-button"
              >
                +&nbsp;&nbsp;&nbsp;&nbsp;열 추가하기
              </button>
            </div>
            <div className="delete-button-space">
              <button
                type="button"
                onClick={onSubtractClick}
                className="delete-button"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className="host-create-button-div">
          <button
            type="button"
            className="host-create-button"
            onClick={onButtonClick}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDetailForm;
