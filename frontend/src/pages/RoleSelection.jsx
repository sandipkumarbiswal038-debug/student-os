import { useNavigate } from "react-router-dom";
import "../styles/RoleSelection.css";
import logo from "../assets/niis.logo.png";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-container">
      <div className="overlay"></div>

      <div className="role-card">

        {/* Logo & College Name */}
        <div className="logo-section">
          <img src={logo} alt="NIIS Logo" className="logo" />

          <h2 className="college-name">
            NIIS Institute of Business
            <br />
            Administration
          </h2>
        </div>

        {/* Welcome Title */}
        <h1>Welcome</h1>

        <p className="subtitle">
          Choose your portal to continue to your academic workspace.
        </p>

        {/* Student Login */}
        <button
          className="role-btn student-btn"
          onClick={() => navigate("/student/login")}
        >
          <div>
            <h3>Student Login</h3>
            <p>View attendance details</p>
          </div>

          <span>→</span>
        </button>

        {/* Faculty Login */}
        <button
          className="role-btn faculty-btn"
          onClick={() => navigate("/faculty/login")}
        >
          <div>
            <h3>Faculty Login</h3>
            <p>Manage attendance records</p>
          </div>

          <span>→</span>
        </button>

      </div>
    </div>
  );
}

export default RoleSelection;