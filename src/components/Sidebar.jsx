import "./Sidebar.css";
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

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">
        <img
          src={logo}
          alt="NIIS Logo"
          className="college-logo"
        />

        <div className="logo-text">
          <h2>NIBA</h2>
          <p>Student Portal</p>
        </div>
      </div>

      {/* Menu */}
      <ul>
        <li>
          <NavLink to="/" className="nav-link">
            <span className="icon-box dashboard-icon">
              <FaHome />
            </span>
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/attendance" className="nav-link">
            <span className="icon-box attendance-icon">
              <FaClipboardCheck />
            </span>
            <span>Attendance</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/timetable" className="nav-link">
            <span className="icon-box timetable-icon">
              <FaCalendarAlt />
            </span>
            <span>Timetable</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/notes & assignments" className="nav-link">
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