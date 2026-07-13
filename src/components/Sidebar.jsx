import "./Sidebar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaCalendarAlt,
  FaBook,
  FaClipboardCheck,
  FaBell,
  FaCalendarCheck,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap
} from "react-icons/fa";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">
        <FaGraduationCap className="logo-icon" />

        <div>
          <h2>NIIS</h2>
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

  

      {/*
      ===========================
          BOTTOM PROFILE
      ===========================

      <div className="sidebar-bottom">

        <div
          className="user-profile"
          onClick={() => setShowMenu(!showMenu)}
        >

          <img
            src={profile}
            alt="Profile"
            className="user-img"
          />

          <div>
            <h4>Name</h4>
          </div>

        </div>

        {showMenu && (

          <ul className="bottom-menu">

            <li>
              <FaCog />
              Settings
            </li>

            <li>
              <FaSignOutAlt />
              Logout
            </li>

          </ul>

        )}

      </div>

      */}

    </aside>
  );
}

export default Sidebar;