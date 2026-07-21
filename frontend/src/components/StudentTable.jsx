import React from "react";
import "../styles/StudentTable.css";

function StudentTable({
  students,
  updateAttendance,
  backPage,
  saveAttendance,
}) {
  return (
    <div className="student-table-card">

      <table className="student-table">

        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Regd No</th>
            <th>Student Name</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 ? (

            <tr>
              <td colSpan="6" className="no-data">
                No students found.
              </td>
            </tr>

          ) : (

            students.map((student, index) => (

              <tr key={student.id}>

                {/* Serial Number */}
                <td>{index + 1}</td>

                {/* Registration Number */}
                <td>{student.roll}</td>

                {/* Student Name */}
                <td>{student.name}</td>

                {/* Present */}
                <td className="center">

                  <input
                    type="checkbox"
                    className="present-check"
                    checked={student.present}
                    onChange={() =>
                      updateAttendance(student.id, true)
                    }
                  />

                </td>

                {/* Absent */}
                <td className="center">

                  <input
                    type="checkbox"
                    className="absent-check"
                    checked={!student.present}
                    onChange={() =>
                      updateAttendance(student.id, false)
                    }
                  />

                </td>

                {/* Status */}
                <td>

                  <span
                    className={
                      student.present
                        ? "status present"
                        : "status absent"
                    }
                  >
                    {student.present
                      ? "Present"
                      : "Absent"}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      {/* Bottom Buttons */}

      <div className="table-buttons">

        <button
          className="back-btn"
          onClick={backPage}
        >
          ← Back
        </button>

        <button
          className="submit-btn"
          onClick={saveAttendance}
        >
          Submit Attendance →
        </button>

      </div>

    </div>
  );
}

export default StudentTable;