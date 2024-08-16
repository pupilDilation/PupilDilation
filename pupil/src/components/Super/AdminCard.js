import styles from "./Super.module.css";

function AdminCard({ id, name, phone, email }) {
  return (
    <div className={styles.cardContainer}>
      <p>{id}</p>
    </div>
  );
}

export default AdminCard;
