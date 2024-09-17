import AnnouncementStyles from "./AnnouncementDesign.module.css";

function Announcement(props) {
  return (
    <div key={props.key} className={AnnouncementStyles.notice}>
      <h2 className={AnnouncementStyles.h1}>{props.notice.title}</h2>
      <p>
        <em className={AnnouncementStyles.em}>{props.notice.date}</em>
      </p>
      <p className={AnnouncementStyles.p}>{props.notice.content}</p>
    </div>
  );
}

export default Announcement;
