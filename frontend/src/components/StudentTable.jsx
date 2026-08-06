import React from "react";
import "../styles/StudentTable.css";
import "../styles/AttendanceControls.css";

function StudentTable({
  students,
  updateAttendance,
  backPage,
  saveAttendance,
  isSaving,
}) {

  return (

    <div className="student-table-card prototype-roster">

      <div className="roster-heading"><h2>Roll</h2><span>{students.length} students on roll</span></div>

      <div className="roster-list">
        {students.length === 0 ? (
          <p className="no-data">No students found.</p>
        ) : students.map((student, index) => (
          <div className="roster-row" key={student.id}>
            <span className="roster-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="roster-student"><strong>{student.student_name}</strong><span>{student.registration_no}</span></div>
            <div className="status-toggle">
              <button className={student.present ? "toggle-btn active-present" : "toggle-btn"} onClick={() => updateAttendance(student.id, true)} disabled={isSaving}>Present</button>
              <button className={!student.present ? "toggle-btn active-absent" : "toggle-btn"} onClick={() => updateAttendance(student.id, false)} disabled={isSaving}>Absent</button>
            </div>
          </div>
        ))}
      </div>

      <div className="table-buttons">

        <button
          className="back-btn"
          onClick={backPage}
          disabled={isSaving}
        >
          ← Back
        </button>

        <button
          className="submit-btn"
          onClick={saveAttendance}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Submit Attendance →"}
        </button>

      </div>

    </div>

  );
}

export default StudentTable;
