import { useEffect, useState } from "react";
import api from "../api/api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events/");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading Events...</h2>;
  }

  return (
    <div className="events-page">
      <h1>College Events</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <h2>{event.title}</h2>

              <p>{event.description}</p>

              <div className="event-details">
                <p><strong>📅 Date:</strong> {event.date}</p>

                <p><strong>⏰ Time:</strong> {event.time}</p>

                <p><strong>📍 Venue:</strong> {event.venue}</p>

                <p>
                  <strong>👥 Participants:</strong>{" "}
                  {event.participants.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;