import "./EventSignups.css";

function EventSignups() {

  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      status: "Registered",
    },
    {
      id: 2,
      name: "Priya Das",
      email: "priya@gmail.com",
      status: "Registered",
    },
    {
      id: 3,
      name: "Aman Kumar",
      email: "aman@gmail.com",
      status: "Waitlisted",
    },
  ];

  return (
    <div className="event-signups">

      <h1>Event Signups</h1>

      <p>Manage student registrations and attendance.</p>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Attendance</th>
          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td>{student.id}</td>

              <td>{student.name}</td>

              <td>{student.email}</td>

              <td>{student.status}</td>

              <td>

                <select>

                  <option>Present</option>

                  <option>Absent</option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <button className="save-btn">
        Save Attendance
      </button>

    </div>
  );
}

export default EventSignups;