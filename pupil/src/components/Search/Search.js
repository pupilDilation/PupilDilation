import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./Search.module.css";
import ClubSearch from "./ClubSearch";
import ConcertSearch from "./ConcertSearch";

/**
 * @author: Jangmyun
 * @param: searchToggle
 */
function Search(props) {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
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
              onChange={handleSearch}
            />
            <img src="/img/logo/search.png" alt="search" />
          </div>
        </div>
        <div className={styles.searchResult}>
          <ClubSearch clubName={search}></ClubSearch>
          <ConcertSearch concertTitle={search}></ConcertSearch>
        </div>
      </div>
    </div>
  );
}

export default Search;
