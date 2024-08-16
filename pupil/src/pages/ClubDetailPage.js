import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";
import ClubDetail from "../components/Club/ClubDetail";
import axios from "axios";

function ClubDetailPage() {
  const { clubId } = useParams(0);
  const [club, setClub] = useState({});
  async function getClubById() {
    try {
      const response = await axios.get(`http://localhost:3001/club/${clubId}`);
      setClub(response.data[0]);
    } catch (error) {
      console.error("Error fetching club data:", error);
    }
  }
  useEffect(() => {
    getClubById();
  }, []);
  return (
    <Wrapper>
      <ClubDetail
        clubName={club.club_name}
        clubDesc={club.club_description}
        clubId={clubId}
      ></ClubDetail>
    </Wrapper>
  );
}

export default ClubDetailPage;
