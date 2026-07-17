import "./Hero.css";
import hero from "../assets/college.png";

import {
  FaClipboardCheck,
  FaCalendarAlt,
  FaBook,
  FaBell,
} from "react-icons/fa";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="hero-overlay">

        {/* Left Section */}

        <div className="hero-left">

          <span className="welcome">
             Welcome Back👋
          </span>

          <h1>Name</h1>

          <p>Stream • Semester </p>

          <h3>NIIS Institute of Business Administration</h3>

          <small>
            Check today's classes, attendance,
            assignments and latest updates.
          </small>

        </div>

        {/* Right Section */}

        <div className="hero-right">

          <div className="stat-card">
            <div className="stat-icon attendance">
              <FaClipboardCheck />
            </div>

            <div>
             { /*<h2>85%</h2>*/}
              <span>Attendance</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon timetable">
              <FaCalendarAlt />
            </div>

            <div>
              {/*<h2>4</h2>*/}
              <span>Timetable</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon notes">
              <FaBook />
            </div>

            <div>
              {/*<h2>12</h2>*/}
              <span>Notes</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon notification">
              <FaBell />
            </div>

            <div>
              {/*<h2>5</h2>*/}
              <span>Notifications</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;