import React, { useState } from "react";

import "../styles/AttendanceHistory.css";

function AttendanceHistory() {

  // ================= DUMMY DATA =================

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

      // Editable (<24 hr)
      markedAt: new Date().toISOString(),

      students: [
        {
          id: 1,
          roll: "220001",
          name: "Rahul Sharma",
          present: true,
        },
        {
          id: 2,
          roll: "220002",
          name: "Priya Das",
          present: true,
        },
        {
          id: 3,
          roll: "220003",
          name: "Aman Kumar",
          present: false,
        },
        {
          id: 4,
          roll: "220004",
          name: "Sneha Roy",
          present: true,
        },
        {
          id: 5,
          roll: "220005",
          name: "Rohit Singh",
          present: true,
        },
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

      // Locked (>24 hr)
      markedAt: "2026-07-18T09:00:00",

      students: [
        {
          id: 1,
          roll: "220001",
          name: "Rahul Sharma",
          present: true,
        },
        {
          id: 2,
          roll: "220002",
          name: "Priya Das",
          present: false,
        },
        {
          id: 3,
          roll: "220003",
          name: "Aman Kumar",
          present: true,
        },
        {
          id: 4,
          roll: "220004",
          name: "Sneha Roy",
          present: true,
        },
        {
          id: 5,
          roll: "220005",
          name: "Rohit Singh",
          present: false,
        },
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

      markedAt: "2026-07-15T08:00:00",

      students: [],
    },

  ];

  // ================= STATES =================

  const [records, setRecords] = useState(attendanceData);

  const [search, setSearch] = useState("");

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [editMode, setEditMode] = useState(false);

  // ================= SEARCH =================

  const filtered = records.filter((item) =>
    item.subject.toLowerCase().includes(search.toLowerCase()) ||
    item.course.toLowerCase().includes(search.toLowerCase()) ||
    item.date.toLowerCase().includes(search.toLowerCase()) ||
    item.section.toLowerCase().includes(search.toLowerCase())
  );

  // ================= 24 HOUR RULE =================

  const canEditAttendance = (markedAt) => {

    const markedTime = new Date(markedAt);

    const now = new Date();

    const hours =
      (now.getTime() - markedTime.getTime()) /
      (1000 * 60 * 60);

    return hours <= 24;

  };

  // ================= TOGGLE =================

  const toggleAttendance = (studentId) => {

    if (!selectedRecord) return;

    const updatedStudents = selectedRecord.students.map((student) =>
      student.id === studentId
        ? {
            ...student,
            present: !student.present,
          }
        : student
    );

    const presentCount =
      updatedStudents.filter((s) => s.present).length;

    const absentCount =
      updatedStudents.length - presentCount;

    setSelectedRecord({
      ...selectedRecord,
      students: updatedStudents,
      present: presentCount,
      absent: absentCount,
    });

  };

  // ================= SAVE =================

  const saveEditedAttendance = () => {

    const updated = records.map((record) =>
      record.id === selectedRecord.id
        ? selectedRecord
        : record
    );

    setRecords(updated);

    setEditMode(false);

    setSelectedRecord(null);

    alert("Attendance Updated Successfully.");

  };

  // ================= CLOSE =================

  const closeModal = () => {

    setSelectedRecord(null);

    setEditMode(false);

  };

  // ================= SUMMARY =================

  const totalClasses = records.length;

  const heldClasses =
    records.filter((r) => r.status === "Held").length;

  const notHeldClasses =
    records.filter((r) => r.status === "Not Held").length;
  return (

  <div className="history-page">

    {/* ================= TITLE ================= */}

    <div className="history-title">

      <h1>Attendance History</h1>

      <p>View and manage previous attendance records</p>

    </div>

    {/* ================= SEARCH ================= */}

    <div className="history-toolbar">

      <input
        type="text"
        placeholder="🔍 Search by Course, Subject, Date or Section..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

    {/* ================= SUMMARY ================= */}

    <div className="history-summary">

      <div className="summary-card">

        <h2>{totalClasses}</h2>

        <p>Total Classes</p>

      </div>

      <div className="summary-card">

        <h2>{heldClasses}</h2>

        <p>Held</p>

      </div>

      <div className="summary-card">

        <h2>{notHeldClasses}</h2>

        <p>Not Held</p>

      </div>

    </div>

    {/* ================= TABLE ================= */}

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

                <div className="action-buttons">

                  <button
                    className="view-btn"
                    onClick={() => {

                      setSelectedRecord(item);

                      setEditMode(false);

                    }}
                  >

                    View

                  </button>

                  {canEditAttendance(item.markedAt) ? (

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

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    {/* ================= MODAL ================= */}

    {selectedRecord && (
           <div className="modal-overlay">

        <div className="attendance-modal">

          {/* ================= HEADER ================= */}

          <div className="modal-header">

            <div>

              <h2>Attendance Details</h2>

              <p className="modal-subtitle">

                {selectedRecord.subject}

              </p>

            </div>

            <button
              className="close-btn"
              onClick={closeModal}
            >
              ✕
            </button>

          </div>

          {/* ================= CONTENT ================= */}

          <div className="modal-content">

            {/* INFO BOXES */}

            <div className="modal-info-grid">

              <div className="info-box">
                <h4>Date</h4>
                <p>{selectedRecord.date}</p>
              </div>

              <div className="info-box">
                <h4>Course</h4>
                <p>{selectedRecord.course}</p>
              </div>

              <div className="info-box">
                <h4>Semester</h4>
                <p>{selectedRecord.semester}</p>
              </div>

              <div className="info-box">
                <h4>Section</h4>
                <p>{selectedRecord.section}</p>
              </div>

              <div className="info-box">
                <h4>Subject</h4>
                <p>{selectedRecord.subject}</p>
              </div>

              <div className="info-box">
                <h4>Status</h4>
                <p>{selectedRecord.status}</p>
              </div>

            </div>

            {/* PRESENT / ABSENT */}

            {selectedRecord.status === "Held" && (

              <div className="attendance-count">

                <div className="count-card present-card">

                  <h3>{selectedRecord.present}</h3>

                  <p>Present</p>

                </div>

                <div className="count-card absent-card">

                  <h3>{selectedRecord.absent}</h3>

                  <p>Absent</p>

                </div>

              </div>

            )}

            {/* LOCK MESSAGE */}

            {!canEditAttendance(selectedRecord.markedAt) && (

              <div className="lock-message">

                🔒 Attendance is locked.

                <br />

                Only Admin can edit after 24 hours.

              </div>

            )}

            {/* NOT HELD */}

            {selectedRecord.status === "Not Held" ? (

              <div className="not-held-text">

                This class was marked as

                <b> Not Held</b>

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

                      <th>Student Name</th>

                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {selectedRecord.students.map((student) => (

                      <tr key={student.id}>

                        <td>{student.roll}</td>

                        <td>{student.name}</td>

                        <td>

                          {editMode && canEditAttendance(selectedRecord.markedAt) ? (

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

                {editMode &&
                  canEditAttendance(selectedRecord.markedAt) && (

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

);

}

export default AttendanceHistory;   