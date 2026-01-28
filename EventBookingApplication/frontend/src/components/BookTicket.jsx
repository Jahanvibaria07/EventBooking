import React, { useState } from "react";
import api from "../services/api";

function BookTicket({ eventId, availableSeats, onBookingSuccess }) {
  const [userName, setUserName] = useState("");
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      setError("Name is required");
      return;
    }

    if (seats <= 0 || seats > availableSeats) {
      setError("Invalid number of seats selected");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      await api.post("/bookings", {
        eventId,
        userName,
        seatsBooked: seats
      });

      setMessage("🎉 Booking confirmed!");
      setUserName("");
      setSeats(1);

      if (onBookingSuccess) {
        onBookingSuccess();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking} style={styles.form}>
      <h4>Book Tickets</h4>

      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        min="1"
        max={availableSeats}
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
        style={styles.input}
      />

      <button
        type="submit"
        disabled={loading || availableSeats === 0}
        style={styles.button}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    marginTop: "12px",
    padding: "12px",
    borderTop: "1px solid #ddd"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  success: {
    color: "green",
    marginTop: "8px"
  },
  error: {
    color: "red",
    marginTop: "8px"
  }
};

export default BookTicket;
