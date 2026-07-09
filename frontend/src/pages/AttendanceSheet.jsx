import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AttendanceSheet.css";

function AttendanceSheet() {

  const navigate = useNavigate();

  const [course, setCourse] = useState("MCA");
  const [semester, setSemester] = useState("3rd Semester");
  const [subject, setSubject] = useState("Web Technology");

  const today = new Date().toISOString().split("T")[0];

  const currentTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleShowStudents = () => {
    navigate("/students", {
      state: {
        course,
        semester,
        subject,
        date: today,
        time: currentTime,
      },
    });
  };

  return (
    <div className="attendance-container">

      <div className="attendance-card">

        <div className="attendance-header">

          <div>
            <h2>Welcome, Faculty 👋</h2>
            <p>Select course details to mark attendance</p>
          </div>

          <button
            className="logout-btn"
            onClick={() => navigate("/")}
          >
            Logout
          </button>

        </div>

        <p className="faculty-name">
          Faculty : Dr. S. Mishra
        </p>

        <div className="form-group">
          <label>Course</label>

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option>MCA</option>
            <option>MBA</option>
          </select>
        </div>

        <div className="form-group">
          <label>Semester</label>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option>1st Semester</option>
            <option>2nd Semester</option>
            <option>3rd Semester</option>
            <option>4th Semester</option>
          </select>
        </div>

        <div className="form-group">
          <label>Subject</label>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Web Technology</option>
            <option>Java</option>
            <option>Python</option>
            <option>DBMS</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            value={today}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Time</label>

          <input
            type="time"
            value={currentTime}
            readOnly
          />
        </div>

        <button
          className="show-btn2"
          onClick={handleShowStudents}
        >
          Show Students
        </button>
        <p className="note">
          * Please verify all details before showing students.
        </p>

      </div>

    </div>
  );
}

export default AttendanceSheet;