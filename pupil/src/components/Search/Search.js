import styles from "./Search.module.css";

/**
 * @author: Jangmyun
 * @param: searchToggle,
 */
function Search(props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src="/img/arrow-down.svg"
            style={{ transform: "rotate(180deg)" }}
            alt="arrow"
            onClick={props.onClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
