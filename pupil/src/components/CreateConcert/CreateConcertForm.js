import React, { useState } from "react";
import "./CreateConcert.css";
import { useNavigate } from "react-router-dom";

function CreateConcertForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [newShowInfo, setNewShowInfo] = useState({
    title: "샘플 공연 제목",
    introduction: "샘플 공연 소개",
    place: "그레이스",
    price: "50000",
    bankName: "샘플은행",
    bankNumber: "123-456-789",
  });
  const [scheduleCount, setScheduleCount] = useState(1);
  const [timeInfo, setTimeInfo] = useState({
    start: {
      year: 2023,
      month: 7,
      day: 15,
      time: "18:00",
    },
    end: {
      year: 2023,
      month: 7,
      day: 16,
      time: "21:00",
    },
    schedule: [
      {
        year: 2023,
        month: 7,
        day: 15,
        time: "19:00",
      },
    ],
  });

  const navigate = useNavigate();

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
    if (scheduleCount > 1) setScheduleCount(scheduleCount - 1);
  };

  const onButtonClick = () => {
    // Placeholder for actual submission logic
    console.log("등록된 정보:", {
      ...newShowInfo,
      schedule: timeInfo.schedule,
      startDate: timeInfo.start,
      endDate: timeInfo.end,
    });
    navigate("/host");
  };

  const days = [];
  const months = [];
  const dayOfWeeks = [];
  const places = [];
  const halls = ["그레이스", "학관", "올네"];
  const weeks = ["월", "화", "수", "목", "금", "토", "일"];
  const schedules = [];

  days.push(
    <option value={0} key="day-0">
      선택&emsp;
    </option>
  );
  for (let i = 1; i <= 31; i += 1) {
    days.push(
      <option value={i} key={`day-${i}`}>
        {i}
      </option>
    );
  }

  months.push(
    <option value={0} key="month-0">
      선택&emsp;
    </option>
  );
  for (let i = 1; i <= 12; i += 1) {
    months.push(
      <option value={i} key={`month-${i}`}>
        {i}
      </option>
    );
  }

  dayOfWeeks.push(
    <option value={0} key="dayOfWeek-0">
      선택&emsp;
    </option>
  );
  for (let i = 1; i <= 7; i += 1) {
    dayOfWeeks.push(
      <option value={i} key={`dayOfWeek-${i}`}>
        {weeks[i - 1]}
      </option>
    );
  }

  places.push(
    <option value={0} key="place-0">
      장소선택&emsp;&emsp;&emsp;&emsp;&emsp;
    </option>
  );
  for (let i = 1; i <= 3; i += 1) {
    places.push(
      <option value={halls[i - 1]} key={`place-${i}`}>
        {halls[i - 1]}
      </option>
    );
  }

  for (let i = 0; i < scheduleCount; i += 1) {
    schedules.push(
      <div className="host-create-ticket-date-end" id={i} key={i}>
        <div className="host-create-ticket-start-text2">
          {i + 1}공&nbsp;&nbsp;
        </div>
        <div className="host-create-date-end-month">
          <select
            name="month"
            className="select-slection"
            onChange={onChangeSchedule}
            id={i}
            value={timeInfo.schedule[i]?.month || 0}
          >
            {months}
          </select>
          <div className="host-create-ticket-start-text">월</div>
        </div>
        <div className="host-create-date-end-day">
          <select
            name="day"
            className="select-slection"
            onChange={onChangeSchedule}
            id={i}
            value={timeInfo.schedule[i]?.day || 0}
          >
            {days}
          </select>
          <div className="host-create-ticket-start-text">일</div>
        </div>
        <div className="host-create-date-end-dayOfWeek">
          <select name="dayOfWeek-end" className="select-slection">
            {dayOfWeeks}
          </select>
          <div className="host-create-ticket-start-text">요일</div>
        </div>
        <input
          type="text"
          className="host-create-date-start-time"
          placeholder="시간 입력(24:00)"
          name="time"
          onChange={onChangeSchedule}
          id={i}
          value={timeInfo.schedule[i]?.time || ""}
        />
      </div>
    );
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
              <select
                name="place"
                className="select-place"
                onChange={onChangeAccount}
                value={newShowInfo.place}
              >
                {places}
              </select>
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
            <div className="host-create-bank">
              <div className="host-create-input-title">입금계좌</div>
              <div className="host-create-bank-set">
                <input
                  className="host-create-bank-name"
                  type="text"
                  placeholder="은행명 입력"
                  name="bankName"
                  onChange={onChangeAccount}
                  value={newShowInfo.bankName}
                />
                <input
                  className="host-create-price-content"
                  type="text"
                  placeholder='"-"포함 계좌번호 입력'
                  name="bankNumber"
                  onChange={onChangeAccount}
                  value={newShowInfo.bankNumber}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="host-create-right-3">
          <div className="host-create-ticket-date">
            <div className="host-create-input-title">예매일정</div>
            <div className="host-create-ticket-date-end">
              <div className="host-create-ticket-start-text2">시작</div>
              <div className="host-create-date-start-month">
                <select
                  name="month"
                  className="select-slection"
                  onChange={onChangeStartDate}
                  value={timeInfo.start.month}
                >
                  {months}
                </select>
                <div className="host-create-ticket-start-text">월</div>
              </div>
              <div className="host-create-date-start-day">
                <select
                  name="day"
                  className="select-slection"
                  onChange={onChangeStartDate}
                  value={timeInfo.start.day}
                >
                  {days}
                </select>
                <div className="host-create-ticket-start-text">일</div>
              </div>
              <div className="host-create-date-start-dayOfWeek">
                <select name="dayOfWeek-start" className="select-slection">
                  {dayOfWeeks}
                </select>
                <div className="host-create-ticket-start-text">요일</div>
              </div>
              <input
                type="text"
                className="host-create-date-start-time"
                placeholder="시간 입력(24:00)"
                name="time"
                onChange={onChangeStartDate}
                value={timeInfo.start.time}
              />
            </div>
            <div className="host-create-ticket-date-end">
              <div className="host-create-ticket-start-text2">마감</div>
              <div className="host-create-date-end-month">
                <select
                  name="month"
                  className="select-slection"
                  onChange={onChangeEndDate}
                  value={timeInfo.end.month}
                >
                  {months}
                </select>
                <div className="host-create-ticket-start-text">월</div>
              </div>
              <div className="host-create-date-end-day">
                <select
                  name="day"
                  className="select-slection"
                  onChange={onChangeEndDate}
                  value={timeInfo.end.day}
                >
                  {days}
                </select>
                <div className="host-create-ticket-start-text">일</div>
              </div>
              <div className="host-create-date-end-dayOfWeek">
                <select name="dayOfWeek-end" className="select-slection">
                  {dayOfWeeks}
                </select>
                <div className="host-create-ticket-start-text">요일</div>
              </div>
              <input
                type="text"
                className="host-create-date-start-time"
                placeholder="시간 입력(24:00)"
                name="time"
                onChange={onChangeEndDate}
                value={timeInfo.end.time}
              />
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
                    year: 2023,
                    month: 7,
                    day: 15,
                    time: "20:00",
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
                className="event-delete-button"
                onClick={onSubtractClick}
              >
                <img src="/images/Trash.svg" alt="열 삭제하기" />
              </button>
            </div>
          </div>
        </div>
        <div className="host-create-right-4">
          <button
            type="button"
            className="host-create-button"
            onClick={onButtonClick}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateConcertForm;
