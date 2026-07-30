import "./SubjectDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

function SubjectDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  const subject = data.subject || "Java";
  const held = data.held || 40;
  const attended = data.attended || 36;
  const percentage = data.percentage || 90;

  return (
    <div className="details-container">
      <div className="details-card">

        <h1>{subject} Attendance Details</h1>

        <div className="stats-section">

          <div className="stat-card">
            <h3>Total Classes</h3>
            <h2>{held}</h2>
          </div>

          <div className="stat-card">
            <h3>Classes Attended</h3>
            <h2>{attended}</h2>
          </div>

          <div className="stat-card">
            <h3>Classes Missed</h3>
            <h2>{held - attended}</h2>
          </div>

          <div className="stat-card">
            <h3>Attendance</h3>
            <h2>{percentage}%</h2>
          </div>

        </div>

        <div className="projection-box">
          <p>
            <strong>Minimum Required Attendance:</strong> 75%
          </p>

          {percentage >= 75 ? (
            <p className="good">
              ✅ Your attendance is above 75%. Keep attending your classes regularly.
            </p>
          ) : (
            <p className="warning-text">
              ⚠ Your attendance is below 75%. Please attend upcoming classes regularly.
            </p>
          )}
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/attendance")}
        >
          ← Back to Attendance
        </button>

      </div>
    </div>
  );
}

export default SubjectDetails;