import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ClubList() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function getClubs() {
      try {
        const response = await axios.get(
          "http://cndlsrb2739.iptime.org:3000/club"
        );
        setClubs(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getClubs();
  }, []);
  return (
    <div>
      <h1>Club Lists</h1>
      <ul>
        {clubs.map((club, index) => (
          <li key={index}>
            <Link to={`/club/${club.club_id}`}>{club.club_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubList;
