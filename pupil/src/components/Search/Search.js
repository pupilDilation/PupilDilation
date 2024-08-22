import { useState } from "react";
import styles from "./Search.module.css";

/**
 * @author: Jangmyun
 * @param: searchToggle
 */
function Search(props) {
  const [search, setSearch] = useState("");
  const onChangeSearchInput = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={styles.overlay} onClick={props.onClick}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <img
            src="/img/arrow-down.svg"
            style={{ transform: "rotate(180deg)" }}
            alt="arrow"
            onClick={props.onClick}
          />
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="공연/동아리 이름으로 검색"
              value={search}
              onChange={onChangeSearchInput}
            />
            <img src="/img/logo/search.png" alt="search" />
          </div>
        </div>
        <div className={styles.searchResult}>{}</div>
      </div>
    </div>
  );
}

export default Search;
