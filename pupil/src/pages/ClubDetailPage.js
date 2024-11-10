import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";
import ClubDetail from "../components/Club/ClubDetail";
import axios from "axios";
import ClubConcertList from "../components/Club/ClubConcertList";

function ClubDetailPage() {
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  async function getClubById() {
    try {
      const response = await axios.get(
        `http://cndlsrb2739.iptime.org:3000/club/${clubId}`
      );
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
      <ClubDetail></ClubDetail>
      <ClubConcertList clubId={clubId}></ClubConcertList>
    </Wrapper>
  );
}

export default ClubDetailPage;
