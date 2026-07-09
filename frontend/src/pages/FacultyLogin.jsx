import logo from "../assets/niis.logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FacultyLogin.css";

function FacultyLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigate("/attendance");
  };

  const handleSendOTP = () => {
    alert("OTP Sent Successfully!");
  };

  const handleOTPLogin = () => {
    navigate("/attendance");
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <img
          src={logo}
          alt="College Logo"
          className="college-logo"
        />

        <h2>Faculty Login</h2>

        <p className="subtitle">
          Attendance Management System
        </p>

        {/* Password Login */}

        <h3 className="section-title">
          Login with Password
        </h3>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
            />

            <button
              type="button"
              className="show-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <p
          className="forgot"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* OTP Login */}

        <h3 className="section-title">
          Login with OTP
        </h3>

        <div className="input-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
          />
        </div>

        <button
          className="otp-btn"
          onClick={handleSendOTP}
        >
          Send OTP
        </button>

        <div className="input-group">
          <label>OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
          />
        </div>

        <button
          className="login-btn"
          onClick={handleOTPLogin}
        >
          Verify & Login
        </button>

        <p className="footer-text">
          © 2026 NIIS Attendance Management System
        </p>

      </div>
    </div>
  );
}

export default FacultyLogin;