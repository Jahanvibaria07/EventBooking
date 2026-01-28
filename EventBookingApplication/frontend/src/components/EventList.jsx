import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/events";

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setEvents(response.data.content || response.data);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div style={styles.grid}>
          {events.map((event) => (
            <div key={event.id} style={styles.card}>
              <h3>{event.name}</h3>
              <p><strong>Location:</strong> {event.location}</p>
              <p>
                <strong>Available Seats:</strong>{" "}
                {event.availableSeats}
              </p>

              <button
                style={styles.button}
                disabled={event.availableSeats === 0}
              >
                {event.availableSeats > 0
                  ? "Book Now"
                  : "Sold Out"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#1976d2",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default EventList;
