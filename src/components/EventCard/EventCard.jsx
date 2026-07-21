import "./EventCard.css";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="event-card">

      <div className="event-icon">
        🎉
      </div>

      <h2>{event.title}</h2>

      <div className="event-info">

        <p>
          📅 <strong>Date:</strong> {event.date}
        </p>

        <p>
          📍 <strong>Venue:</strong> {event.venue}
        </p>

        <p>
          👤 <strong>Organizer:</strong> {event.organizer}
        </p>

      </div>

      <div className="event-buttons">

        <Link to={`/event-details/${event.id}`}>
          <button>View Details</button>
        </Link>

      </div>

    </div>
  );
}

export default EventCard;