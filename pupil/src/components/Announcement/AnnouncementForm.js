import React, { useState } from "react";
import "./AnnouncementDesign.css"; // 추가된 부분

const AnnouncementForm = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "새로운 서비스 출시",
      date: "2024-08-01",
      content: "새로운 서비스를 출시했습니다. 많은 이용 바랍니다.",
    },
    {
      id: 2,
      title: "점검 안내",
      date: "2024-07-25",
      content: "서버 점검이 예정되어 있습니다. 이용에 참고 바랍니다.",
    },
    {
      id: 3,
      title: "이벤트 안내",
      date: "2024-07-20",
      content: "여름 맞이 이벤트를 진행합니다. 많은 참여 바랍니다.",
    },
  ]);

  return (
    <div className="container">
      <h1>공지사항</h1>
      {notices.map((notice) => (
        <div key={notice.id} className="notice">
          <h2>{notice.title}</h2>
          <p>
            <em>{notice.date}</em>
          </p>
          <p>{notice.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementForm;
