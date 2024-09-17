import { Link } from "react-router-dom";
import styles from "./Search.module.css";

function ConcertCard({ title, imgUrl, onClose, id }) {
  return (
    <div className={styles.concertCardContainer}>
      <Link className={styles.link} to={`/details/${id}`} onClick={onClose}>
        {imgUrl ? (
          <img src={imgUrl} alt={title} />
        ) : (
          <img src="/img/loadImage.png" alt={title} />
        )}
        <p>{title}</p>
      </Link>
    </div>
  );
}

export default ConcertCard;
