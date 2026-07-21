import "./EventDetails.css";
import { useParams } from "react-router-dom";

function EventDetails() {

  const { id } = useParams();

  const events = [
    {
      id: 1,
      title: "Hackathon 2026",
      description:
        "Participate in a 24-hour coding competition and showcase your innovation.",
      date: "10 August 2026",
      time: "10:00 AM - 5:00 PM",
      location: "Computer Lab",
      organizer: "Computer Science Department",
      capacity: 100,
      registered: 78,
    },
    {
      id: 2,
      title: "AI Workshop",
      description:
        "Learn Artificial Intelligence and Machine Learning from industry experts.",
      date: "15 August 2026",
      time: "11:00 AM - 2:00 PM",
      location: "Seminar Hall",
      organizer: "AI Club",
      capacity: 80,
      registered: 52,
    },
    {
      id: 3,
      title: "Sports Meet",
      description:
        "Annual college sports competition with exciting indoor and outdoor games.",
      date: "22 August 2026",
      time: "9:00 AM",
      location: "College Ground",
      organizer: "Sports Committee",
      capacity: 200,
      registered: 145,
    },
  ];

  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return <h2>Event Not Found</h2>;
  }

  return (
    <div className="event-details">

      <h1>{event.title}</h1>

      <div className="details-card">

        <p><strong>Description:</strong> {event.description}</p>

        <p><strong>Date:</strong> {event.date}</p>

        <p><strong>Time:</strong> {event.time}</p>

        <p><strong>Location:</strong> {event.location}</p>

        <p><strong>Organizer:</strong> {event.organizer}</p>

        <p><strong>Capacity:</strong> {event.capacity}</p>

        <p><strong>Registered Students:</strong> {event.registered}</p>

        <div className="buttons">

          <button className="signup-btn">
            Sign Up
          </button>

          <button className="cancel-btn">
            Cancel Registration
          </button>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;