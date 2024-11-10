import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservationListForm from "../components/ReservationList/ReservationListForm";
import styles from "../components/ReservationList/ReservationListDesign.module.css"; // Import the CSS module

function ReservationListPage() {
  const { concertId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null); // New state for session ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noReservations, setNoReservations] = useState(false); // New state for empty reservations

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);

        // Fetch the sessions for the concert
        const sessionResponse = await axios.get(
          `http://cndlsrb2739.iptime.org:3000/sessions/${concertId}/session`
        );
        setSessions(sessionResponse.data);

        // Automatically select the first session if available
        if (sessionResponse.data.length > 0) {
          setSelectedSessionId(sessionResponse.data[0].session_id);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchSessions();
  }, [concertId]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!selectedSessionId) return; // Don't fetch if no session selected

      try {
        setLoading(true);

        // Fetch reservations for the selected session
        const reservationResponse = await axios.get(
          `http://cndlsrb2739.iptime.org:3000/reservations/session/${selectedSessionId}`
        );

        // Check if there are no reservations
        if (reservationResponse.data.reservations.length === 0) {
          setNoReservations(true); // Set the no reservations flag
        } else {
          setNoReservations(false);
        }

        setReservations(reservationResponse.data.reservations);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 404) {
          // Handle 404 error as "no reservations" rather than a failure
          setNoReservations(true);
          setReservations([]);
          setLoading(false);
        } else {
          setLoading(false);
          setError(error.message || "An error occurred while fetching data");
        }
      }
    };

    fetchReservations();
  }, [selectedSessionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>공연 예약자 명단</h1>

      {/* Session Dropdown */}
      <div className={styles.sessionSelectContainer}>
        <label htmlFor="sessionSelect" className={styles.label}>
          Select Session:
        </label>
        <select
          id="sessionSelect"
          className={styles.select}
          value={selectedSessionId}
          onChange={(e) => setSelectedSessionId(e.target.value)}
        >
          {sessions.map((session) => (
            <option key={session.session_id} value={session.session_id}>
              {new Date(session.session_date).toLocaleString()} -{" "}
              {session.session_title}
            </option>
          ))}
        </select>
      </div>

      {noReservations ? (
        <p className={styles.noReservationsMessage}>예약이 아직 없습니다.</p>
      ) : (
        <ReservationListForm reservations={reservations} />
      )}
    </div>
  );
}

export default ReservationListPage;
