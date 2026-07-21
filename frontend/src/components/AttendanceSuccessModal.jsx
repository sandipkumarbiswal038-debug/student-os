import "../styles/AttendanceSuccessModal.css";

function AttendanceSuccessModal({
  open,
  onClose,
  attendanceInfo,
  students,
}) {

  if (!open) return null;

  const present = students.filter(
    (student) => student.present
  ).length;

  const absent = students.length - present;

  return (

    <div className="modal-overlay">

      <div className="success-modal">

        <div className="success-icon">
          ✓
        </div>

        <h2>Attendance Submitted</h2>

        <p>Your attendance has been saved successfully.</p>

        <div className="summary">

          <div>
            <strong>Course</strong>
            <span>{attendanceInfo.course}</span>
          </div>

          <div>
            <strong>Subject</strong>
            <span>{attendanceInfo.subject}</span>
          </div>

          <div>
            <strong>Date</strong>
            <span>{attendanceInfo.date}</span>
          </div>

          <div>
            <strong>Present</strong>
            <span>{present}</span>
          </div>

          <div>
            <strong>Absent</strong>
            <span>{absent}</span>
          </div>

        </div>

        <button
          className="close-modal-btn"
          onClick={onClose}
        >
          OK
        </button>

      </div>

    </div>

  );

}

export default AttendanceSuccessModal;