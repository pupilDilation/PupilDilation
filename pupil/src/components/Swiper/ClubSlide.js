import { Link } from "react-router-dom";
import styles from "./slider.module.css";

function ClubSlide({ item, bgColor }) {
  return (
    <Link to={"/club"} className={styles.sliderLink}>
      <div className={styles.slideButtonContainer}>
        <button
          style={{ backgroundColor: bgColor }}
          className={styles.slideButton}
        >
          {item.club_name}
        </button>
      </div>
    </Link>
  );
}

export default ClubSlide;
