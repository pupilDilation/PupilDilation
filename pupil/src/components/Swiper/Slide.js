import { Link } from "react-router-dom";
import styles from "./slider.module.css";

function Slide({ item, sessionId }) {
  return (
    <Link to={"/detail"} className={styles.sliderLink}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderImgContainer}>
          {item.concert_img ? (
            <img src={item.concert_img} alt={item.concert_title} />
          ) : (
            <img src={"/img/loadImage.png"} alt={item.concert_title} />
          )}
        </div>
        <dl className={styles.slideInfo}>
          <dt>{item.concert_title}</dt>
          <dd>{item.concert_location}</dd>
        </dl>
      </div>
    </Link>
  );
}

export default Slide;
