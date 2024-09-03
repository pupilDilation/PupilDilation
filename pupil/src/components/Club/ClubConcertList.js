import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ClubConcertList() {
  const { clubId } = useParams();

  const { data, setData } = useState([]);
  async function getConcertsByClubId() {
    try {
      const res = await axios.get(
        `http://localhost:3001/concerts/club/${clubId}`
      );
      console.log(res);
      if (res.data.success) {
        return res.data;
      }
      throw new Error("data fetch failed");
    } catch (error) {
      console.log(error);
    }
  }

  // const { data, error, isLoading, isError } = useQuery({
  //   queryKey: ["clubId", clubId],
  //   queryFn: () => getConcertsByClubId(),
  // });

  useEffect(() => {
    getConcertsByClubId();
  }, []);

  return (
    <div>
      {!data ? (
        <div>No Concerts</div>
      ) : (
        data.map((concert, index) => (
          <div key={index}>{concert.concert_title}</div>
        ))
      )}
    </div>
  );
}

export default ClubConcertList;
