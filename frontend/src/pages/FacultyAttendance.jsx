import React from "react";
import "../styles/FacultyAttendance.css";

const students = [
  { id: 101, name: "Anita Maity" },
  { id: 102, name: "Rahul Kumar" },
  { id: 103, name: "Priya Das" },
  { id: 104, name: "Amit Singh" },
  { id: 105, name: "Sneha Patel" },
  { id: 106, name: "Rohit Sharma" },
];

function FacultyAttendance() {
  return (
    <div className="faculty-container">

      {/* Header */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search student..."
          className="search-box"
        />
      </div>

      <div className="content">

        {/* Left Side */}
        <div className="attendance-card">

          <h2>Subject Attendance</h2>

          <div className="filters">

            <select>
              <option>Faculty</option>
            </select>

            <select>
              <option>Program</option>
            </select>

            <select>
              <option>Section</option>
            </select>

            <select>
              <option>Course</option>
            </select>

            <button className="search-btn">
              Search
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Not Held</th>
              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr key={student.id}>

                  <td>{student.id}</td>

                  <td>{student.name}</td>

                  <td>
                    <input
                      type="radio"
                      name={student.id}
                    />
                  </td>

                  <td>
                    <input
                      type="radio"
                      name={student.id}
                    />
                  </td>

                  <td>
                    <input
                      type="radio"
                      name={student.id}
                    />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <button className="save-btn">
            Save Attendance
          </button>

        </div>

        {/* Right Side */}

        <div className="summary">

          <div className="box yellow">
            <h3>240</h3>
            <p>Total Students</p>
          </div>

          <div className="box green">
            <h3>230</h3>
            <p>Present Today</p>
          </div>

          <div className="box red">
            <h3>10</h3>
            <p>Absent Today</p>
          </div>

          <div className="box blue">
            <h3>5</h3>
            <p>Not Held</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default FacultyAttendance;