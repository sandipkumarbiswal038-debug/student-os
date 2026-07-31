import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/StudentLogin.css";
import niisLogo from "../assets/niis.logo.png";
import { loginUser } from "../api/authApi";

export default function StudentLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const { data } = await loginUser(email, password, "student");
      const token = data.token || data.access || data.access_token || data.key;
      if (!token) throw new Error("The login server did not return an access token.");

      localStorage.setItem("authToken", token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      navigate("/student/attendance");
    } catch (error) {
      const message = error.response?.data?.detail || (
        error.request
          ? "Unable to reach the login server. The backend may be offline or blocking this browser."
          : error.message
      );
      setErrors({
        login: message || (
          error.request
            ? "Unable to connect to the login server. Please try again shortly."
            : "Unable to sign in. Please try again."
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div className="faculty-login-container">

      <div className="faculty-login-card">

        <div className="login-header">

          <img
            src={niisLogo}
            alt="NIIS Logo"
            className="login-logo"
          />

          <div className="login-logo-text">
            <h4>
              NIIS Institute of Business
              <br />
              Administration
            </h4>
          </div>

        </div>

        <h2>Student Login</h2>

        <p>
          Sign in to continue to the Attendance Management System.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <div className="input-box">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter your college email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {errors.email && (
            <span className="error">
              {errors.email}
            </span>
          )}

          <label>Password</label>

          <div className="password-box">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="show-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {errors.password && (
            <span className="error">
              {errors.password}
            </span>
          )}

          {errors.login && (
            <span className="error login-error">
              {errors.login}
            </span>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  );

}
