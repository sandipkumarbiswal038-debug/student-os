import "./Signup.css";

function Signup() {
  return (
    <div className="signup-page">

      <h1>Event Signup</h1>

      <form className="signup-form">

        <label>Signup ID</label>
        <input
          type="text"
          placeholder="Enter Signup ID"
        />

        <label>Event ID</label>
        <input
          type="text"
          placeholder="Enter Event ID"
        />

        <label>Student ID</label>
        <input
          type="text"
          placeholder="Enter Student ID"
        />

        <label>Status</label>

        <select>
          <option>Booked</option>
          <option>Waiting</option>
          <option>Cancelled</option>
        </select>

        <label>Signed Up At</label>

        <input
          type="datetime-local"
        />

        <label>Status Changed At</label>

        <input
          type="datetime-local"
        />

        <button type="submit">
          Register Event
        </button>

      </form>

    </div>
  );
}

export default Signup;