import "./CreateEvent.css";

function CreateEvent() {
  return (
    <div className="create-event">

      <h1>Create Event</h1>
      <p>Create a new college event.</p>

      <form className="event-form">

        <div className="form-group">
          <label>Event Title</label>
          <input type="text" placeholder="Enter event title" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            placeholder="Enter event description"
          ></textarea>
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input type="time" />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input type="time" />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Seminar Hall"
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              placeholder="100"
            />
          </div>

        </div>

        <div className="form-group">
          <label>Organizer Name</label>
          <input
            type="text"
            placeholder="Computer Science Department"
          />
        </div>

        <button className="publish-btn">
          Publish Event
        </button>

      </form>

    </div>
  );
}

export default CreateEvent;