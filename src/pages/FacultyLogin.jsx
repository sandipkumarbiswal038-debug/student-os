import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";

export default function FacultyLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("portalRole", "faculty");
    localStorage.setItem("facultyProfile", JSON.stringify({ name: "Faculty member", email }));
    navigate("/notes-and-assignments", { state: { mode: "faculty" } });
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <img src="/logo.jpg" alt="NIIS logo" className="login-logo" />
        <h2>Faculty Login</h2>
        <p>Sign in to manage assignments, grades, notes, and moderation.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Faculty email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button type="submit">Continue to Faculty Workspace</button>
        </form>
        <button className="back-btn" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
}
