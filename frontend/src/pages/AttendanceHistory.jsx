import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/AttendanceHistory.css";

function AttendanceHistory() {

  const attendanceData = [
    {
      id: 1,
      date: "20-07-2026",
      course: "MCA",
      semester: "2",
      section: "A",
      subject: "Machine Learning",
      present: 42,
      absent: 3,
      status: "Held",
      editable: true,

      students: [
        { id: 1, roll: "220001", name: "Rahul Sharma", present: true },
        { id: 2, roll: "220002", name: "Priya Das", present: true },
        { id: 3, roll: "220003", name: "Aman Kumar", present: false },
        { id: 4, roll: "220004", name: "Sneha Roy", present: true },
        { id: 5, roll: "220005", name: "Rohit Singh", present: true },
      ],
    },

    {
      id: 2,
      date: "19-07-2026",
      course: "MCA",
      semester: "2",
      section: "A",
      subject: "Cloud Computing",
      present: 40,
      absent: 5,
      status: "Held",
      editable: true,

      students: [
        { id: 1, roll: "220001", name: "Rahul Sharma", present: true },
        { id: 2, roll: "220002", name: "Priya Das", present: false },
        { id: 3, roll: "220003", name: "Aman Kumar", present: true },
        { id: 4, roll: "220004", name: "Sneha Roy", present: true },
        { id: 5, roll: "220005", name: "Rohit Singh", present: false },
      ],
    },

    {
      id: 3,
      date: "18-07-2026",
      course: "MCA",
      semester: "2",
      section: "A",
      subject: "Advanced Java",
      present: 0,
      absent: 0,
      status: "Not Held",
      editable: false,

      students: [],
    },
  ];

  const [records, setRecords] = useState(attendanceData);

  const [search, setSearch] = useState("");

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const filtered = records.filter(
    (item) =>
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.course.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAttendance = (studentId) => {
    if (!selectedRecord) return;

    const updatedStudents = selectedRecord.students.map((student) =>
      student.id === studentId
        ? { ...student, present: !student.present }
        : student
    );

    const presentCount = updatedStudents.filter(
      (student) => student.present
    ).length;

    const absentCount = updatedStudents.length - presentCount;

    setSelectedRecord({
      ...selectedRecord,
      students: updatedStudents,
      present: presentCount,
      absent: absentCount,
    });
  };

  const saveEditedAttendance = () => {
    const updatedRecords = records.map((record) =>
      record.id === selectedRecord.id ? selectedRecord : record
    );

    setRecords(updatedRecords);

    setEditMode(false);

    alert("Attendance Updated Successfully.");
  };
    return (
    <div className="attendance-layout">

      <Sidebar />

      <div className="attendance-main">

        <Header />

        <div className="attendance-container">

          <div className="attendance-title">
            <h1>Attendance History</h1>
          </div>

          {/* Search */}
          <div className="history-toolbar">
            <input
              type="text"
              placeholder="🔍 Search Subject or Course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* History Table */}
          <div className="history-card">

            <table className="history-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Section</th>
                  <th>Subject</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((item) => (

                  <tr key={item.id}>

                    <td>{item.date}</td>
                    <td>{item.course}</td>
                    <td>{item.semester}</td>
                    <td>{item.section}</td>
                    <td>{item.subject}</td>
                    <td>{item.present}</td>
                    <td>{item.absent}</td>

                    <td>
                      <span
                        className={
                          item.status === "Held"
                            ? "status held"
                            : "status not-held"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="view-btn"
                        onClick={() => {
                          setSelectedRecord(item);
                          setEditMode(false);
                        }}
                      >
                        View
                      </button>

                      <br /><br />

                      {item.editable ? (

                        <button
                          className="edit-btn"
                          onClick={() => {
                            setSelectedRecord(item);
                            setEditMode(true);
                          }}
                        >
                          Edit
                        </button>

                      ) : (

                        <span className="locked-tag">
                          🔒 Locked
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Popup */}

          {selectedRecord && (

            <div className="modal-overlay">

              <div className="attendance-modal">

                <div className="modal-header">

                  <h2>Attendance Details</h2>

                  <button
                    className="close-btn"
                    onClick={() => {
                      setSelectedRecord(null);
                      setEditMode(false);
                    }}
                  >
                    ✕
                  </button>

                </div>

                <div className="modal-content">

                  <p><strong>Date :</strong> {selectedRecord.date}</p>
                  <p><strong>Course :</strong> {selectedRecord.course}</p>
                  <p><strong>Semester :</strong> {selectedRecord.semester}</p>
                  <p><strong>Section :</strong> {selectedRecord.section}</p>
                  <p><strong>Subject :</strong> {selectedRecord.subject}</p>

                  {selectedRecord.status === "Not Held" ? (

                    <div className="not-held-text">
                      This class was marked as <b>Not Held</b>.
                    </div>

                  ) : (

                    <>

                      <h3 className="student-heading">
                        Student Attendance
                      </h3>

                      <table className="student-history-table">

                        <thead>

                          <tr>
                            <th>Regd No</th>
                            <th>Name</th>
                            <th>Status</th>
                          </tr>

                        </thead>

                        <tbody>

                          {selectedRecord.students.map((student) => (

                            <tr key={student.id}>

                              <td>{student.roll}</td>

                              <td>{student.name}</td>

                              <td>

                                {editMode ? (

                                  <input
                                    type="checkbox"
                                    checked={student.present}
                                    onChange={() =>
                                      toggleAttendance(student.id)
                                    }
                                  />

                                ) : (

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

                                )}

                              </td>

                            </tr>

                          ))}

                        </tbody>

                      </table>

                      {editMode && (

                        <button
                          className="save-edit-btn"
                          onClick={saveEditedAttendance}
                        >
                          Save Changes
                        </button>

                      )}

                    </>

                  )}

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AttendanceHistory;