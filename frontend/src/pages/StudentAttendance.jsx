import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/StudentAttendance.css";

function StudentAttendance() {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    course,
    semester,
    subject,
    date,
    time,
  } = location.state || {};

  const students = [
    { id: 1, regd: "MCA001", name: "Rahul" },
    { id: 2, regd: "MCA002", name: "Priya" },
    { id: 3, regd: "MCA003", name: "Aman" },
    { id: 4, regd: "MCA004", name: "Neha" },
  ];

  const [attendance, setAttendance] = useState({});
  const [search, setSearch] = useState("");

  const handleChange = (id, value) => {
    setAttendance({
      ...attendance,
      [id]: value,
    });
  };

  const handleMarkAllPresent = () => {
    const allPresent = {};

    students.forEach((student) => {
      allPresent[student.id] = "Present";
    });

    setAttendance(allPresent);
  };

  const presentCount = Object.values(attendance).filter(
    (value) => value === "Present"
  ).length;

  const absentCount = Object.values(attendance).filter(
    (value) => value === "Absent"
  ).length;

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.regd.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {

    const confirmSave = window.confirm(
      "Are you sure you want to save attendance?"
    );

    if (confirmSave) {
      console.log(attendance);
      alert("Attendance Saved Successfully!");
    }

  };

  return (
    <div className="student-container">

      <div className="student-card">

        <div className="header">
          <h2>Student Attendance</h2>

          <button
            className="logout-btn"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>

        <div className="attendance-info">
          <p><b>Course:</b> {course}</p>
          <p><b>Semester:</b> {semester}</p>
          <p><b>Subject:</b> {subject}</p>
          <p><b>Date:</b> {date}</p>
          <p><b>Time:</b> {time}</p>
        </div>

        <div className="summary-box">
          <h3>Attendance Summary</h3>

          <p><b>Total Students:</b> {students.length}</p>
          <p><b>Present:</b> {presentCount}</p>
          <p><b>Absent:</b> {absentCount}</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Name or Registration No"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="top-buttons">
          <button
            className="present-all-btn"
            onClick={handleMarkAllPresent}
          >
            ✓ Mark All Present
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Regd No</th>
              <th>Name</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.regd}</td>
                <td>{student.name}</td>

                <td>
                  <input
                    type="radio"
                    name={student.id}
                    checked={attendance[student.id] === "Present"}
                    onChange={() =>
                      handleChange(student.id, "Present")
                    }
                  />
                </td>

                <td>
                  <input
                    type="radio"
                    name={student.id}
                    checked={attendance[student.id] === "Absent"}
                    onChange={() =>
                      handleChange(student.id, "Absent")
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-group">
          <button
            className="back-btn"
            onClick={() => navigate("/attendance")}
          >
            Back
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Attendance
          </button>
        </div>

      </div>

    </div>
  );
}

export default StudentAttendance;