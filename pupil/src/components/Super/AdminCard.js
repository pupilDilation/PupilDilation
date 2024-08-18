import styles from "./Super.module.css";

function AdminCard({ id, name, phone, email }) {
  return (
    <div className={styles.adminCardWrapper}>
      <div className={styles.cardContainer}>
        <p>
          <span>{id}</span>
          <span>{name}</span>
        </p>
      </div>
      <div className={styles.inputBox}>
        <input type="text" id="username" placeholder="username" />
        <input type="text" id="id" placeholder="id" />
        <input type="text" id="password" placeholder="password" />
        <input type="text" id="phone" placeholder="phone" />
        <input type="text" id="email" placeholder="email" />
      </div>
    </div>
  );
}

export default AdminCard;
