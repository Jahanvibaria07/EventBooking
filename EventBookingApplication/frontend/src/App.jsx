import React from "react";
import EventList from "./components/EventList";

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Event Booking System</h1>
        <p>Browse events and book tickets instantly</p>
      </header>

      <main style={styles.main}>
        <EventList />
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5"
  },
  header: {
    backgroundColor: "#1976d2",
    color: "#ffffff",
    padding: "20px",
    textAlign: "center"
  },
  main: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto"
  }
};

export default App;
