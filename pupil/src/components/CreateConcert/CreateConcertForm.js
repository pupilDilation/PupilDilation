import React, { useState } from "react";
import axios from "axios";
import "./CreateConcert.css"; // Import the CSS file

function CreateConcertForm() {
  const [concertTitle, setConcertTitle] = useState("");
  const [concertImg, setConcertImg] = useState("");
  const [concertPrice, setConcertPrice] = useState("");
  const [concertLocation, setConcertLocation] = useState("");
  const [concertPlot, setConcertPlot] = useState("");
  const [sessions, setSessions] = useState([
    { sessionDate: "", sessionTime: "" },
  ]);
  const [error, setError] = useState(null);

  const handleAddSession = () => {
    setSessions([...sessions, { sessionDate: "", sessionTime: "" }]);
  };

  const handleSessionChange = (index, field, value) => {
    const newSessions = sessions.map((session, i) => {
      if (i === index) {
        return { ...session, [field]: value };
      }
      return session;
    });
    setSessions(newSessions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const concertData = {
        concert_title: concertTitle,
        concert_img: concertImg,
        concert_price: concertPrice,
        concert_location: concertLocation,
        concert_plot: concertPlot,
        sessions: sessions.map((session) => ({
          session_date: session.sessionDate,
          session_time: session.sessionTime,
        })),
      };

      await axios.post("http://localhost:3001/admin/concerts", concertData);
      alert("Concert added successfully!");
      // Clear form
      setConcertTitle("");
      setConcertImg("");
      setConcertPrice("");
      setConcertLocation("");
      setConcertPlot("");
      setSessions([{ sessionDate: "", sessionTime: "" }]);
    } catch (err) {
      setError("Failed to add concert.");
      console.error(err);
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-text">Add New Concert</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="admin-form-top-wrapper">
          <label className="admin-form-labels">Concert Image URL:</label>
          <input
            type="text"
            value={concertImg}
            onChange={(e) => setConcertImg(e.target.value)}
            required
            className="admin-form-inputs"
          />
        </div>
        <div className="admin-form-top-wrapper">
          <label className="admin-form-labels">Concert Title:</label>
          <input
            type="text"
            value={concertTitle}
            onChange={(e) => setConcertTitle(e.target.value)}
            required
            className="admin-form-inputs"
          />
        </div>
        <div className="admin-form-top-wrapper">
          <label className="admin-form-labels">Concert Price:</label>
          <input
            type="number"
            value={concertPrice}
            onChange={(e) => setConcertPrice(e.target.value)}
            required
            className="admin-form-inputs"
          />
        </div>
        <div className="admin-form-top-wrapper">
          <label className="admin-form-labels">Concert Location:</label>
          <input
            type="text"
            value={concertLocation}
            onChange={(e) => setConcertLocation(e.target.value)}
            required
            className="admin-form-inputs"
          />
        </div>
        <div className="admin-form-top-wrapper">
          <label className="admin-form-labels">Concert Plot:</label>
          <textarea
            value={concertPlot}
            onChange={(e) => setConcertPlot(e.target.value)}
            required
            className="admin-form-inputs"
          />
        </div>
        <div className="admin-form-top-wrapper">
          <label className="admin-form-labels">Sessions:</label>
          {sessions.map((session, index) => (
            <div key={index} className="session-item">
              <input
                type="date"
                value={session.sessionDate}
                onChange={(e) =>
                  handleSessionChange(index, "sessionDate", e.target.value)
                }
                required
                className="admin-form-inputs"
              />
              <input
                type="time"
                value={session.sessionTime}
                onChange={(e) =>
                  handleSessionChange(index, "sessionTime", e.target.value)
                }
                required
                className="admin-form-inputs"
              />
            </div>
          ))}
          <div className="complete-btn-container">
            <button
              type="button"
              onClick={handleAddSession}
              className="complete-btn"
            >
              Add Session
            </button>
          </div>
        </div>
        <div className="complete-btn-container">
          <button type="submit" className="complete-btn">
            Add Concert
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateConcertForm;