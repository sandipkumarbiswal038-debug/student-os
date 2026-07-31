import React from "react";
import "../styles/StudentTable.css";

function StudentTable({
  students,
  updateAttendance,
  backPage,
  saveAttendance,
  isSaving,
}) {

  return (

    <div className="student-table-card">

      <table className="student-table">

        <thead>

          <tr>
            <th>Sl No.</th>
            <th>Regd No</th>
            <th>Student Name</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {students.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="no-data"
              >
                No students found.
              </td>

            </tr>

          ) : (

            students.map((student, index) => (

              <tr key={student.id}>

                <td>{index + 1}</td>

                <td>{student.registration_no}</td>

                <td>{student.student_name}</td>

                <td>

                  <div className="status-toggle">

                    <button
                      className={
                        student.present
                          ? "toggle-btn active-present"
                          : "toggle-btn"
                      }
                      onClick={() => updateAttendance(student.id, true)}
                      disabled={isSaving}
                    >
                      Present
                    </button>

                    <button
                      className={
                        !student.present
                          ? "toggle-btn active-absent"
                          : "toggle-btn"
                      }
                      onClick={() => updateAttendance(student.id, false)}
                      disabled={isSaving}
                    >
                      Absent
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

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