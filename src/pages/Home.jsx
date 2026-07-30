import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStudentEvents } from "../student/StudentEventsContext";
import "./Home.css";

function Home() {
  const { events, getStatus } = useStudentEvents();
  const [query, setQuery] = useState("");

  const visibleEvents = useMemo(() => {
    return events.filter((event) =>
      `${event.title} ${event.venue}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    );
  }, [events, query]);

  return (
    <main className="student-home">
      <header className="student-home-header">
        <h1>Upcoming College Events</h1>
        <p>Discover, register and participate in college events.</p>
      </header>

      <div className="student-home-actions">
        <Link to="/student-registration">
          Student Registration
        </Link>
      </div>

      <label className="student-event-search">
        <input
          type="text"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <section className="student-event-grid">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((event) => {
            const status = getStatus(event.id);

            return (
              <article className="student-event-card" key={event.id}>
                <div className="student-event-emoji">
                  {event.emoji}
                </div>

                <h2>{event.title}</h2>

                <p>📅 {event.date}</p>
                <p>⏰ {event.time}</p>
                <p>📍 {event.venue}</p>

                <div style={{ marginTop: "18px" }}>
                  <Link to={`/event-details/${event.id}`}>
                    View Details
                  </Link>

                  {status?.state === "signed_up" && (
                    <p style={{ color: "green", marginTop: "10px" }}>
                      Signed Up
                    </p>
                  )}

                  {status?.state === "waitlisted" && (
                    <p style={{ color: "orange", marginTop: "10px" }}>
                      Waitlisted #{status.position}
                    </p>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <p className="student-no-events">
            No events found.
          </p>
        )}
      </section>
    </main>
  );
}

export default Home;