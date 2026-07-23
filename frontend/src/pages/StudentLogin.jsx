import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaIdCard, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/StudentLogin.css";
import niisLogo from "../assets/niis.logo.png";

export default function StudentLogin() {

  const navigate = useNavigate();

  const [regdNo, setRegdNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

    if (!regdNo.trim()) {
      newErrors.regdNo = "Registration Number is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    if (
      regdNo === "2505280075" &&
      password === "Student@123"
    ) {
      navigate("/student/attendance");
    } else {
      setErrors({
        login: "Invalid Registration Number or Password",
      });
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

          <label>Registration Number</label>

          <div className="input-box">

            <FaIdCard className="input-icon" />

            <input
              type="text"
              placeholder="Enter Registration Number"
              value={regdNo}
              onChange={(e) => setRegdNo(e.target.value)}
            />

          </div>

          {errors.regdNo && (
            <span className="error">
              {errors.regdNo}
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
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

}