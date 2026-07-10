import "./Header.css";
import profile from "../assets/profile pic.png";

import { FaMoon, FaSun, FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [greeting, setGreeting] = useState("");
  <div
  className="profile"
  onClick={() => navigate("/profile")}
></div>

  // Dark / Light Mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  // Greeting based on current time
  useEffect(() => {

    const updateGreeting = () => {

      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } 
      else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon");
      } 
      else if (hour >= 17 && hour < 21) {
        setGreeting("Good Evening");
      } 
      else {
        setGreeting("Good Night");
      }

    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);

  }, []);

  return (
    <header className="header">

      {/* Left Side */}
      <div className="header-left">
        <p>{greeting}</p>
      </div>

      {/* Right Side */}
      <div className="header-right">

        {/* Dark / Light Mode */}
        <button
          className="icon-btn"
          onClick={toggleTheme}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notification */}
        <button
  className="icon-btn notification"
  onClick={() => navigate("/notifications")}>
  <FaBell />
 </button>
        {/* Profile */}
        <div
          className="profile"
          onClick={() => navigate("/profile")}
        >
          <img
            src={profile}
            alt="Profile"
          />

          <div>
            <h4>Name</h4>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;