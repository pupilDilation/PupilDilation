import React, { useEffect, useState } from "react";
import styles from "./AnnouncementDesign.module.css"; // 변경된 부분
import Announcement from "./Announcement";
import axios from "axios";

const AnnouncementForm = () => {
  const [notices, setNotices] = useState([]);

  async function getCurrentAnnounce() {
    try {
      const res = await axios.get("http://localhost:3001/announcement/3month");
      setNotices(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentAnnounce();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>공지사항</h1>
      {notices.map((notice) => (
        <div key={notice.id} className={styles.notice}>
          <h2 className={styles.h2}>{notice.announce_title}</h2>
          <p>
            <em className={styles.em}>{notice.created_at}</em>
          </p>
          <p className={styles.p}>{notice.announce_content}</p>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementForm;
