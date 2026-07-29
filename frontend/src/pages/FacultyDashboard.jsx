import { useNavigate } from "react-router-dom";
import {
  FaBookOpen, FaCalendarAlt, FaCheck, FaChevronDown, FaChevronRight,
  FaClipboardCheck, FaClipboardList, FaClock, FaFileAlt, FaHome,
  FaRegCalendarAlt, FaRegCommentAlt, FaRegFileAlt, FaRegWindowMaximize,
} from "react-icons/fa";
import "../styles/FacultyDashboard.css";
import "../styles/FacultyTheme.css";
import logo from "../assets/logo.jpg";

const classes = [
  { time: "09:00", subject: "Data Structures", section: "SEC A", detail: "Room 204 · Theory", count: "52 / 60", state: "filed" },
  { time: "11:00", subject: "DBMS Lab", section: "SEC B", detail: "Lab 3 · Practical", count: "— / 30", state: "action" },
  { time: "14:00", subject: "Operating Systems", section: "SEC A", detail: "Room 108 · Theory", count: "— / 60", state: "upcoming" },
];

function NavItem({ icon, children, active, badge, nested, onClick }) {
  return <button className={`faculty-nav-item ${active ? "active" : ""} ${nested ? "nested" : ""}`} onClick={onClick}>
    {icon}<span>{children}</span>{badge && <em>{badge}</em>}{!active && !nested && (children === "My classes" ? <FaChevronDown className="nav-chevron" /> : <FaChevronRight className="nav-chevron" />)}
  </button>;
}

export default function FacultyDashboard() {
  const navigate = useNavigate();
  return <main className="faculty-dashboard">
    <aside className="faculty-sidebar">
      <div className="faculty-brand">
        <div className="faculty-brand-mark"><img src={logo} alt="NIIS" /></div>
        <div><strong>NIIS</strong><small>FACULTY PORTAL</small></div>
      </div>
      <nav>
        <p className="nav-label">OVERVIEW</p>
        <NavItem active icon={<FaHome />}>Home</NavItem>
        <p className="nav-label teaching-label">TEACHING</p>
        <NavItem icon={<FaCalendarAlt />}>My classes</NavItem>
        <div className="faculty-subnav">
          <button className="subnav-active">Today's schedule</button>
          <button>Full timetable</button>
          <button>File a DCR</button>
        </div>
        <NavItem icon={<FaRegCommentAlt />}>Lesson plan</NavItem>
        <NavItem icon={<FaClipboardCheck />} badge="3" onClick={() => navigate("/attendance")}>Attendance</NavItem>
        <p className="nav-label academics-label">ACADEMICS</p>
        <NavItem icon={<FaRegFileAlt />}>Assignments</NavItem>
        <NavItem icon={<FaRegWindowMaximize />}>Notes</NavItem>
        <NavItem icon={<FaRegCalendarAlt />}>Events</NavItem>
      </nav>
    </aside>

    <section className="faculty-content">
      <header className="dashboard-topbar">
        <div><p className="eyebrow">PROF DASHBOARD</p><h1>Home</h1><p className="welcome">Good morning, Dr. Rout.</p></div>
        <p className="date"><b>Tuesday,</b> 21 July 2026</p>
      </header>
      <div className="dashboard-rule" />

      <section className="dashboard-section">
        <div className="section-title"><h2>Today's classes</h2><button>Full timetable →</button></div>
        <div className="class-list">
          {classes.map(item => <div className="dashboard-class" key={item.time}>
            <time>{item.time}</time>
            <div className="class-details"><div><h3>{item.subject}</h3><span>{item.section}</span></div><p>{item.detail}</p></div>
            <div className="class-count">{item.count}</div>
            <div className="class-status">
              {item.state === "filed" && <span className="status-filed"><FaCheck /> DCR filed</span>}
              {item.state === "action" && <button onClick={() => navigate("/attendance")}><b>＋</b> File DCR</button>}
              {item.state === "upcoming" && <span className="status-upcoming"><FaClock /> Upcoming</span>}
            </div>
          </div>)}
        </div>
      </section>

      <section className="dashboard-section glance-section">
        <div className="section-title"><h2>July at a glance</h2><button>Monthly report →</button></div>
        <div className="glance-grid">
          <GlanceCard icon={<FaCalendarAlt />} tone="blue" label="Classes scheduled" value="58" note="3 classes today" />
          <GlanceCard icon={<FaFileAlt />} tone="gold" label="DCR filed" value="46" note="79% completion" />
          <GlanceCard icon={<FaBookOpen />} tone="teal" label="Lesson plans" value="12" note="This month" />
          <GlanceCard icon={<FaClipboardList />} tone="purple" label="Assignments" value="8" note="Active assignments" />
        </div>
      </section>
    </section>
  </main>;
}

function GlanceCard({ icon, tone, label, value, note }) {
  return <article className={`glance-card ${tone}`}><div className="glance-icon">{icon}</div><p>{label}</p><strong>{value}</strong><small>{note}</small></article>;
}