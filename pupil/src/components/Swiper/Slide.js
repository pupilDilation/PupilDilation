import { Link } from "react-router-dom";
import styles from "./slider.module.css";

function Slide({ item }) {
  return (
    <Link to={"/detail"} className={styles.sliderLink}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderImgContainer}>
          {item.imgURL != null ? (
            <img src={item.imgURL} alt={item.title} />
          ) : (
            <img src={"/img/loadImage.png"} alt={item.title} />
          )}
        </div>
        <dl className={styles.slideInfo}>
          <dt>{item.title}</dt>
          <dd>{item.venue}</dd>
          <dd>{item.screening_period}</dd>
        </dl>
      </div>
    </Link>
  );
}

export default Slide;
