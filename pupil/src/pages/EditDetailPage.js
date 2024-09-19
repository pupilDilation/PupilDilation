// EditDetailPage.js
import React from "react";
import { useParams } from "react-router-dom"; // useParams to get URL parameters
import EditDetailForm from "../components/EditDetail/EditDetailForm"; // Import the EditDetailForm

function EditDetailPage() {
  const { concertId } = useParams(); // Extract the concertId from the URL

  // Pass the concertId as a prop to EditDetailForm
  return <EditDetailForm concertId={concertId} />;
}

export default EditDetailPage;
