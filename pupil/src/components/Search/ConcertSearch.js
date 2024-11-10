import { useQuery } from "@tanstack/react-query";
import ConcertCard from "./ConcertCard";
import styles from "./Search.module.css";
import axios from "axios";

function ConcertSearch({ concertTitle, onClose }) {
  console.log(concertTitle);
  async function fetchConcerts(concertTitle) {
    const { data } = await axios.get(
      "http://cndlsrb2739.iptime.org:3000/concerts/get/concertbytitle",
      {
        params: { concert_title: concertTitle },
      }
    );
    console.log(data);
    return data;
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["concerts", concertTitle],
    queryFn: () => fetchConcerts(concertTitle),
    enabled: concertTitle.length >= 2,
  });

  return (
    <div className={styles.concertResult}>
      {isLoading ? (
        <div>공연 제목으로 검색중...</div>
      ) : data && data.length > 0 ? (
        data.map((item, index) => {
          // return <div key={item.concert_id}>{item.concert_title}</div>;
          return (
            <ConcertCard
              key={index}
              id={item.concert_id}
              title={item.concert_title}
              imgUrl={item.concert_img}
              onClose={onClose}
            ></ConcertCard>
          );
        })
      ) : null}
      {isError ? <div>공연 정보를 찾을 수 없습니다.</div> : null}
    </div>
  );
}

export default ConcertSearch;
