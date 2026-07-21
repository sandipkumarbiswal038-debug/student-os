import "../styles/AttendanceTabs.css";

import {
  FaClipboardCheck,
  FaBookOpen,
  FaHistory,
} from "react-icons/fa";

function AttendanceTabs({ activeTab, setActiveTab }) {
  return (
    <div className="attendance-tabs">

      <button
        className={
          activeTab === "attendance"
            ? "tab-btn active"
            : "tab-btn"
        }
        onClick={() => setActiveTab("attendance")}
      >
        <FaClipboardCheck />
        <span>Mark Attendance</span>
      </button>

      <button
        className={
          activeTab === "classes"
            ? "tab-btn active"
            : "tab-btn"
        }
        onClick={() => setActiveTab("classes")}
      >
        <FaBookOpen />
        <span>My Classes</span>
      </button>

      <button
        className={
          activeTab === "history"
            ? "tab-btn active"
            : "tab-btn"
        }
        onClick={() => setActiveTab("history")}
      >
        <FaHistory />
        <span>Attendance History</span>
      </button>

    </div>
  );
}

export default AttendanceTabs;