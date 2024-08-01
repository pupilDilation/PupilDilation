import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
/**
 * @author: hhaminlee
 * @description: clubList에서 클릭 된 clubId를 통해서 해당 동아리 정보 출력
 */
function ClubDetail() {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getClubById() {
      try {
        const response = await axios.get(
          `http://localhost:3001/club/${clubId}`
        );
        setClub(response.data[0]);
      } catch (error) {
        console.error("Error fetching club data:", error);
      } finally {
        setLoading(false);
      }
    }

    getClubById();
  }, [clubId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {club ? (
        <>
          <p>Club ID: {clubId}</p>
          <h1>Club name: {club.club_name}</h1>
          <p>Club description: {club.club_description}</p>
        </>
      ) : (
        <h2>Club not found</h2>
      )}
    </div>
  );
}

export default ClubDetail;
