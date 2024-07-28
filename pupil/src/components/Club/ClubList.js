import React from "react";
import { Link } from "react-router-dom";

const clubs = [
  { id: 1, name: "즉새두" },
  { id: 2, name: "네오" },
  { id: 3, name: "mic" },
  { id: 4, name: "리퀴드" },
  { id: 5, name: "하향" },
];

function ClubList() {
  return (
    <div>
      <h1>Clubs</h1>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <Link to={`/club/${club.id}`}>{club.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubList;
