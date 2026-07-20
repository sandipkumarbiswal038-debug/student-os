import "../styles/Sidebar.css";
import profile from "../assets/profile pic.png.jpeg";

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
  FaGraduationCap,
  FaHistory,
  FaChalkboardTeacher
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

        {/* Dashboard */}
        <li>
          <NavLink to="/" className="nav-link">
            <span className="icon-box dashboard-icon">
              <FaHome />
            </span>

            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* Attendance */}
        <li>
          <NavLink to="/attendance" className="nav-link">
            <span className="icon-box attendance-icon">
              <FaClipboardCheck />
            </span>

            <span>Attendance</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/my-classes" className="nav-link">

             <span className="icon-box classes-icon">
               <FaChalkboardTeacher />
        </span>

        <span>My Classes</span>

     </NavLink>
    </li>

        {/* Attendance History */}
        <li>
          <NavLink to="/attendance-history" className="nav-link">
            <span className="icon-box history-icon">
              <FaHistory />
            </span>

            <span>Attendance History</span>
          </NavLink>
        </li>

        {/* Timetable */}
        <li>
          <NavLink to="/timetable" className="nav-link">
            <span className="icon-box timetable-icon">
              <FaCalendarAlt />
            </span>

            <span>Timetable</span>
          </NavLink>
        </li>

        {/* Notes */}
        <li>
          <NavLink to="/notes" className="nav-link">
            <span className="icon-box notes-icon">
              <FaBook />
            </span>

            <span>Notes</span>
          </NavLink>
        </li>

        {/* Notifications */}
        <li>
          <NavLink to="/notifications" className="nav-link">
            <span className="icon-box notification-icon">
              <FaBell />
            </span>

            <span>Notifications</span>
          </NavLink>
        </li>

        {/* Events */}
        <li>
          <NavLink to="/events" className="nav-link">
            <span className="icon-box events-icon">
              <FaCalendarCheck />
            </span>

            <span>Events</span>
          </NavLink>
        </li>

      </ul>

      {/* Bottom Profile */}
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
              <span>Settings</span>
            </li>

            <li>
              <FaSignOutAlt />
              <span>Logout</span>
            </li>

          </ul>
        )}

      </div>

    </aside>
  );
}

export default Sidebar;