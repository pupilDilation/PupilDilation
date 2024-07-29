import React from "react";
import { useParams } from "react-router-dom";

const clubs = [
  { id: 1, name: "즉새두", description: "즉새두입니다." },
  { id: 2, name: "네오", description: "네오입니다." },
  { id: 3, name: "MIC", description: "MIC입니다." },
  { id: 4, name: "리퀴드", description: "리퀴드." },
  {
    id: 5,
    name: "하향",
    description: "하향입니다.",
  },
];

function ClubDetail() {
  const { clubId } = useParams();
  const club = clubs.find((c) => c.id === parseInt(clubId));

  if (!club) {
    return <h2>Club not found</h2>;
  }

  return (
    <div>
      <h1>{club.name}</h1>
      <p>{club.description}</p>
    </div>
  );
}

export default ClubDetail;
