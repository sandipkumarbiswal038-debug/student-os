import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await API.get("/api/users/");

      const users = response.data;

      const matchedUser = users.find(
        (user) =>
          user.college_email &&
          user.college_email.toLowerCase() === email.toLowerCase()
      );

      if (matchedUser) {
        localStorage.setItem("user", JSON.stringify(matchedUser));
        localStorage.setItem("portalRole", "student");

        navigate("/dashboard");
      } else {
        setError("Email is not registered.");
      }
    } catch (err) {
      console.error(err);
      setError("Backend connection failed.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="login-logo"
        />

        <h2>Student Login</h2>

        <p>Sign in to continue to your dashboard.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default StudentLogin;
