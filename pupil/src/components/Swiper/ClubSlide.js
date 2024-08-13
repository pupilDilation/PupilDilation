import { Link } from "react-router-dom";
import styles from "./slider.module.css";

function ClubSlide({ item }) {
  return (
    <Link to={"/club"} className={styles.sliderLink}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderImgContainer}>
          {item.club_img ? (
            <img src={item.club_img} alt={item.club_id} />
          ) : (
            <img src={"/img/loadImage.png"} alt={item.club_img} />
          )}
        </div>
        <dl className={styles.slideInfo}>
          <dt>{item.club_name}</dt>
          <dd>{item.club_description}</dd>
        </dl>
      </div>
    </Link>
  );
}

export default ClubSlide;
