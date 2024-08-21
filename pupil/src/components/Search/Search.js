import styles from "./Search.module.css";

/**
 * @author: Jangmyun
 * @param: searchToggle,
 */
function Search(props) {
  return (
    <div className={styles.overlay} onClick={props.onClick}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src="/img/arrow-down.svg"
            style={{ transform: "rotate(180deg)" }}
            alt="arrow"
            onClick={props.onClick}
          />
          <div className={styles.searchBox}>
            <input type="text" />
            <img src="/img/logo/search.png" alt="search" />
          </div>
        </div>
        <div className={styles.searchResearch}></div>
      </div>
    </div>
  );
}

export default Search;
