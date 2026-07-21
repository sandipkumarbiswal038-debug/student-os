import "./MyEvents.css";
import { useState } from "react";

function MyEvents() {
  const [events, setEvents] = useState([
    {
      id: "EVT001",
      name: "Hackathon 2026",
      time: "10:00 AM",
      location: "Computer Lab",
    },
    {
      id: "EVT002",
      name: "AI Workshop",
      time: "02:00 PM",
      location: "Seminar Hall",
    },
    {
      id: "EVT003",
      name: "Sports Meet",
      time: "09:00 AM",
      location: "College Ground",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleEdit = (name) => {
    alert(`Edit ${name}`);
  };

  return (
    <div className="myevents-container">

      <h1>My Events</h1>

      <div className="organizer-card">
        <p><strong>Organizer ID :</strong> ORG001</p>
        <p><strong>Organizer Name :</strong> Bishnupriya Sahoo</p>
      </div>

      <table className="event-table">

        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Time</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.time}</td>
              <td>{event.location}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(event.name)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MyEvents;