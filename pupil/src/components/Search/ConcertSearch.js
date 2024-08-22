import { useQuery } from "@tanstack/react-query";
import ConcertCard from "./ConcertCard";
import styles from "./Search.module.css";
import axios from "axios";

function ConcertSearch({ concertTitle }) {
  console.log(concertTitle);
  async function fetchClubs(concertTitle) {
    const { data } = await axios.get(
      "http://localhost:3001/concerts/get/concertbytitle",
      {
        params: { concert_title: concertTitle },
      }
    );
    console.log(data);
    return data;
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["concerts", concertTitle],
    queryFn: () => fetchClubs(concertTitle),
    enabled: concertTitle.length >= 2,
  });

  return (
    <div className={styles.concertResult}>
      {isLoading ? (
        <div>검색중...</div>
      ) : data && data.length > 0 ? (
        data.map((item, index) => {
          // return <div key={item.concert_id}>{item.concert_title}</div>;
          return (
            <ConcertCard
              key={index}
              title={item.concert_title}
              imgUrl={item.concert_img}
            ></ConcertCard>
          );
        })
      ) : null}
      {isError ? <div>공연 정보를 찾을 수 없습니다.</div> : null}
    </div>
  );
}

export default ConcertSearch;
