import { Link } from "react-router-dom";
import styles from "./slider.module.css";

function ClubSlide({ item, bgColor }) {
  return (
    <Link to={`/club/${item.club_id}`} className={styles.sliderLink}>
      <div className={styles.clubSliderContainer}>
        <div className={styles.clubSliderImgContainer}>
          <img src={item.club_img} alt={item.club_name} />
        </div>
        <p className={styles.clubName}>{item.club_name}</p>
      </div>
    </Link>
  );
}

export default ClubSlide;
