import "./EventDetails.css";
import { Link, useParams } from "react-router-dom";
import { useStudentEvents } from "../student/StudentEventsContext";

function EventDetails() {
  const { id } = useParams();
  const { getEvent, getStatus, signupCount, signUp, cancelSignup, addNotification } = useStudentEvents();
  const event = getEvent(id);
  const status = getStatus(id);

  if (!event) {
    return <div className="event-details"><h2>Event not found</h2><Link className="details-back" to="/student">Back to events</Link></div>;
  }

  const handleSignUp = () => {
    const result = signUp(id);
    if (!result) return;
    addNotification(result.state === "waitlisted"
      ? `You are waitlisted for ${event.title} at position ${result.position}.`
      : `You have successfully signed up for ${event.title}.`);
  };

  const handleCancel = () => {
    if (!status || status.state === "cancelled") return;
    cancelSignup(id);
    addNotification(`Your registration for ${event.title} has been cancelled.`);
  };

  return (
    <div className="event-details">
     <Link className="details-back" to="/events">Back to upcoming events</Link>
      <h1>{event.title}</h1>
      <div className="details-card">
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.venue}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>
        <p><strong>Signed-up students:</strong> {signupCount(event)} / {event.capacity}</p>
        {status?.state === "waitlisted" && <p className="waitlist-message">This event is full. You are waitlisted at position {status.position}.</p>}
        <div className="buttons">
          <button className="signup-btn" onClick={handleSignUp} disabled={status?.state === "signed_up" || status?.state === "waitlisted"}>Sign Up</button>
          <button className="cancel-btn" onClick={handleCancel} disabled={!status || status.state === "cancelled"}>Cancel Event</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;