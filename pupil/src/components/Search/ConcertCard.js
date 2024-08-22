import styles from "./Search.module.css";

function ConcertCard({ title, imgUrl }) {
  return (
    <div className={styles.concertCardContainer}>
      {imgUrl ? (
        <img src={imgUrl} alt={title} />
      ) : (
        <img src="/img/loadImage.png" alt={title} />
      )}
      <p>{title}</p>
    </div>
  );
}

export default ConcertCard;
