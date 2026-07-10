import "./Timetable.css";

function Timetable() {
  return (
    <div className="timetable-page">

      <div className="table-header">
        <h1>📅 MCA Weekly Timetable</h1>
        <p>Semester 4 • Department of MCA</p>
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Day/Time</th>
              <th>09:00 - 10:00</th>
              <th>10:00 - 11:00</th>
              <th>11:15 - 12:15</th>
              <th>12:15 - 01:15</th>
              <th>01:15 - 02:00</th>
              <th>02:00 - 03:00</th>
              <th>03:00 - 04:00</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="day">Monday</td>
              <td>Python</td>
              <td>Data Structures</td>
              <td>Java</td>
              <td>Web Technology</td>
              <td className="lunch">Lunch</td>
              <td>Python Lab</td>
              <td>Soft Skills</td>
            </tr>

            <tr>
              <td className="day">Tuesday</td>
              <td>DBMS</td>
              <td>Computer Networks</td>
              <td>Operating Systems</td>
              <td>Artificial Intelligence</td>
              <td className="lunch">Lunch</td>
              <td>Web Development Lab</td>
              <td>Project Discussion</td>
            </tr>

            <tr>
              <td className="day">Wednesday</td>
              <td>Java</td>
              <td>Software Engineering</td>
              <td>DBMS Lab</td>
              <td>Python Programming</td>
              <td className="lunch">Lunch</td>
              <td>Mini Project</td>
              <td>Seminar</td>
            </tr>

            <tr>
              <td className="day">Thursday</td>
              <td>Operating Systems</td>
              <td>Artificial Intelligence</td>
              <td>Computer Networks</td>
              <td>DBMS</td>
              <td className="lunch">Lunch</td>
              <td>Coding Practice</td>
              <td>Cyber Security</td>
            </tr>

            <tr>
              <td className="day">Friday</td>
              <td>Web Technology</td>
              <td>Python Lab</td>
              <td>Software Engineering</td>
              <td>Project Work</td>
              <td className="lunch">Lunch</td>
              <td>Cloud Computing</td>
              <td>Placement Training</td>
            </tr>

            <tr>
              <td className="day">Saturday</td>
              <td>Aptitude</td>
              <td>Library</td>
              <td>Seminar</td>
              <td>Placement Training</td>
              <td className="lunch">Lunch</td>
              <td>Holiday</td>
              <td>Holiday</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Timetable;