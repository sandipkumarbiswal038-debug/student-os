import "../styles/SubjectDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header"; 

function SubjectDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
    subject = "Java",
    held = 40,
    attended = 36,
    percentage = 90
} = location.state || {};
  return (
    <>

    <Sidebar/>
    <div className="details-container">

       <Header />

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
        <h3>Current Attendance</h3>
        <h2>{percentage}%</h2>
      </div>

    </div>
        <div className="projection-box">

    
          

          <p><strong>Minimum Required:</strong> 75%
          </p>
          {percentage >= 75 ? (


          <p className="good">
            ✅ You are above the required attendance.
            Keep attending classes regularly.
          </p>
          ) : (
            <p className="warning-text">
            ⚠ Your attendance is below 75%.
            Please attend upcoming classes regularly.
            </p>

          )}


        </div>

        <button
            className="back-btn"
            onClick={() => navigate("/student/attendance")}
        >
        ← Back 
        </button>


      </div>

    </div>
      </>
  );
}

export default SubjectDetails;