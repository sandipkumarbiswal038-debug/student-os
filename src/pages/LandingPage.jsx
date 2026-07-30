import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="overlay">
      <div className="login-card">

        <div className="logo">
          <img src="/logo.jpg" alt="Logo" />

          <div>
            <h2>NIIS Institute of Business Administration</h2>
            <p>Student Operating System</p>
          </div>
        </div>

        <h1>Welcome</h1>

        <p className="text">
          Choose your portal to continue to your academic workspace.
        </p>

        <div
          className="portal student"
          onClick={() => navigate("/student-login")}
        >
          <div>
            <h3>🎓 Student Login</h3>
            <small>Assignments and Notes Library</small>
          </div>

          <span>➜</span>
        </div>

        <div
          className="portal faculty"
          onClick={() => navigate("/faculty-login")}
        >
          <div>
            <h3>👨‍🏫 Faculty Login</h3>
            <small>Console and Moderation Queue</small>
          </div>

          <span>➜</span>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;