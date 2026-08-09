import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getSubjectAttendance } from "../api/studentAttendanceApi";
import "../styles/SubjectDetails.css";

function SubjectDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.state?.subject;
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const student = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!token || !student || !subject) {
      navigate("/student/attendance", { replace: true });
      return;
    }

    let refreshTimer;
    const loadDetails = () => getSubjectAttendance(token, student, subject)
      .then((attendance) => {
        setDetails(attendance);
        setError("");
      })
      .catch((requestError) => setError(requestError.message || "Unable to load attendance details."));

    loadDetails();
    // Keep this selected subject current when a faculty submits attendance.
    refreshTimer = window.setInterval(loadDetails, 30000);
    const refreshAfterSubmission = (event) => {
      if (event.key === "attendanceLastUpdated") loadDetails();
    };
    window.addEventListener("storage", refreshAfterSubmission);
    return () => {
      window.clearInterval(refreshTimer);
      window.removeEventListener("storage", refreshAfterSubmission);
    };
  }, [navigate, subject]);

  const total = details?.total ?? 0;
  const attended = details?.attended ?? 0;
  const percentage = details?.percentage ?? 0;
  const projectedAfterTwoMisses = total ? Math.round((attended / (total + 2)) * 100) : 0;
  const subjectName = subject?.name || "Subject";

  return (
    <><Sidebar />
      <div className="details-container"><Header />
        <div className="details-card">
          <h1>{subjectName} Attendance Details</h1>
          {!details && !error && <p>Loading attendance details...</p>}
          {error && <p className="error login-error">{error}</p>}
          <div className="stats-section">
            <div className="stat-card"><h3>Total Classes</h3><h2>{total}</h2></div>
            <div className="stat-card"><h3>Classes Attended</h3><h2>{attended}</h2></div>
            <div className="stat-card"><h3>Classes Missed</h3><h2>{Math.max(0, total - attended)}</h2></div>
            <div className="stat-card"><h3>Current Attendance</h3><h2>{percentage}%</h2></div>
          </div>
          {details && total === 0 && <p className="warning-text">No attendance records have been published for this subject yet.</p>}
          {details && total > 0 && <div className="projection-box"><p><strong>Minimum Required:</strong> 75%</p><p className={percentage >= 75 ? "good" : "warning-text"}>{percentage >= 75 ? "You are above the required attendance." : "Your attendance is below 75%. Please attend upcoming classes regularly."}</p><p><strong>Projection:</strong> If you miss 2 more classes, your attendance will be {projectedAfterTwoMisses}%.</p></div>}
          <button className="back-btn" onClick={() => navigate("/student/attendance")}>← Back</button>
        </div>
      </div>
    </>
  );
}

export default SubjectDetails;
