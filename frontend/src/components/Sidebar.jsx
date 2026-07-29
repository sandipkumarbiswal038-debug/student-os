import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.jpg";

import {
  FaHome,
  FaCalendarAlt,
  FaBook,
  FaClipboardCheck,
  FaBell,
  FaCalendarCheck,
} from "react-icons/fa";

function Sidebar({ variant = "student" }) {
  const isFaculty = variant === "faculty";
  return (
    <aside className={`sidebar ${isFaculty ? "faculty-sidebar-nav" : ""}`}>

      {/* Logo */}
      <div className="logo">
        <img
          src={logo}
          alt="NIIS Logo"
          className="college-logo"
        />

        <div className="sidebar-logo-text">
          <h2>{isFaculty ? "NIIS" : "NIBA"}</h2>
          <p>{isFaculty ? "Faculty Portal" : "Student Portal"}</p>
        </div>
      </div>

      {/* Menu */}
      <ul>

        {isFaculty && <li className="faculty-nav-label">Overview</li>}

        <li>
          <NavLink to="/" className="nav-link">
            <span className="icon-box dashboard-icon">
              <FaHome />
            </span>
            <span>Dashboard</span>
          </NavLink>
        </li>

        {isFaculty && <li className="faculty-nav-label teaching-label">Teaching</li>}

        <li>
          <NavLink to="/attendance" className="nav-link">
            <span className="icon-box attendance-icon">
              <FaClipboardCheck />
            </span>
            <span>Attendance</span>
          </NavLink>
        </li>

        {isFaculty && <li className="faculty-nav-label academics-label">Academics</li>}

        <li>
          <NavLink to="/timetable" className="nav-link">
            <span className="icon-box timetable-icon">
              <FaCalendarAlt />
            </span>
            <span>Timetable</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/notes-and-assignments" className="nav-link">
            <span className="icon-box notes-icon">
              <FaBook />
            </span>
            <span>Notes & Assignments</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/notifications" className="nav-link">
            <span className="icon-box notification-icon">
              <FaBell />
            </span>
            <span>Notifications</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/events" className="nav-link">
            <span className="icon-box events-icon">
              <FaCalendarCheck />
            </span>
            <span>Events</span>
          </NavLink>
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;