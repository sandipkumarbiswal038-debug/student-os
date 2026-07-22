import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/FacultyLogin.css";
import niisLogo from "../assets/niis.logo.png";

export default function FacultyLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

    if (!email.trim()) {

      newErrors.email = "Email is required";

    }

    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {

      newErrors.email = "Enter a valid email address";

    }

    if (!password) {

      newErrors.password = "Password is required";

    }

    else if (password.length < 8) {

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
      email === "faculty@niba.edu.in" &&
      password === "Faculty@123"
    ) {

      navigate("/attendance");

    } else {

      setErrors({
        login: "Invalid email or password",
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

          <h4>
            NIIS Institute of Business Administration
          </h4>

        </div>

        <h2>Faculty Login</h2>

        <p>

          Sign in to continue to the Attendance
          Management System.

        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <div className="input-box">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
                        <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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