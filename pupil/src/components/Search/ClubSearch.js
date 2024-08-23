import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import axios from "axios";

function ClubSearch({ clubName, onClose }) {
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
    retry: false,
  });

  return (
    <div className={styles.clubResult}>
      {isLoading ? (
        <div>동아리 이름으로 검색중...</div>
      ) : data && data.length > 0 ? (
        data.map((item) => {
          return (
            <div key={item.club_id} className={styles.clubTag}>
              <Link
                to={`/club/${item.club_id}`}
                className={styles.link}
                onClick={onClose}
              >
                {item.club_name}
              </Link>
            </div>
          );
        })
      ) : null}
      {isError ? <div>동아리를 찾을 수 없습니다.</div> : null}
    </div>
  );
}

export default ClubSearch;
