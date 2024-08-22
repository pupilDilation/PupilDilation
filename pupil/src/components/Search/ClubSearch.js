import { useQuery } from "@tanstack/react-query";
import styles from "./Search.module.css";
import axios from "axios";

function ClubSearch({ clubName }) {
  async function fetchClubs(clubName) {
    const { data } = await axios.get(
      "http://localhost:3001/club/get/clubbyname",
      {
        params: { club_name: clubName },
      }
    );
    return data;
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["clubs", clubName],
    queryFn: () => fetchClubs(clubName),
    enabled: clubName.length >= 2,
  });

  return (
    <div className={styles.clubResult}>
      {isLoading ? (
        <div>검색중...</div>
      ) : data && data.length > 0 ? (
        data.map((item) => {
          return <div key={item.club_id}>{item.club_name}</div>;
        })
      ) : null}
      {isError ? <div>동아리를 찾을 수 없습니다.</div> : null}
    </div>
  );
}

export default ClubSearch;
