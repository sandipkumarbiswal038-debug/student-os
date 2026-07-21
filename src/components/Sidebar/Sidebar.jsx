import "./Sidebar.css";
import logo from "../../assets/logo.jpg";
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

      <div className="logo">

       <div className="college-logo">
  <img src={logo} alt="NIIS Logo" />
</div>

        <div className="logo-text">
          <h2>NIBA</h2>
          <p>Student Portal</p>
        </div>

      </div>

      <ul>

        <li>
          <a href="#" className="nav-link active">
            <span className="icon-box dashboard-icon">
              <FaHome />
            </span>
            <span>Dashboard</span>
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            <span className="icon-box attendance-icon">
              <FaClipboardCheck />
            </span>
            <span>Attendance</span>
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            <span className="icon-box timetable-icon">
              <FaCalendarAlt />
            </span>
            <span>Timetable</span>
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            <span className="icon-box notes-icon">
              <FaBook />
            </span>
            <span>Notes & Assignments</span>
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            <span className="icon-box notification-icon">
              <FaBell />
            </span>
            <span>Notifications</span>
          </a>
        </li>

        <li>
          <a href="#" className="nav-link">
            <span className="icon-box events-icon">
              <FaCalendarCheck />
            </span>
            <span>Events</span>
          </a>
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;