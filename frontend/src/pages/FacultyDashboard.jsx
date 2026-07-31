import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen, FaCalendarAlt, FaChevronDown, FaChevronRight,
  FaClipboardCheck, FaClipboardList, FaFileAlt, FaHome,
  FaRegCalendarAlt, FaRegCommentAlt, FaRegFileAlt, FaRegWindowMaximize,
} from "react-icons/fa";
import "../styles/FacultyDashboard.css";
import "../styles/FacultyTheme.css";
import logo from "../assets/logo.jpg";
import { getFacultyDashboard } from "../api/facultyDashboardApi";

function NavItem({ icon, children, active, badge, nested, onClick }) {
  return <button className={`faculty-nav-item ${active ? "active" : ""} ${nested ? "nested" : ""}`} onClick={onClick}>
    {icon}<span>{children}</span>{badge && <em>{badge}</em>}{!active && !nested && (children === "My classes" ? <FaChevronDown className="nav-chevron" /> : <FaChevronRight className="nav-chevron" />)}
  </button>;
}

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!token || !savedUser) {
      navigate("/faculty/login", { replace: true });
      return;
    }
    getFacultyDashboard(token, savedUser)
      .then(({ faculty: profile, sessions }) => {
        setFaculty(profile);
        setClasses(sessions);
        localStorage.setItem("currentUser", JSON.stringify(profile));
      })
      .catch((requestError) => setError(requestError.message || "Unable to load faculty dashboard."));
  }, [navigate]);

  const displayClasses = classes.map((item) => ({
    id: item.id,
    time: item.start_time || item.time || "-",
    subject: item.subject_name || item.subject?.name || item.subject || "Subject",
    section: item.section || item.batch || "-",
    detail: [item.room, item.class_type || item.type].filter(Boolean).join(" · ") || "Class details not available",
    count: item.students_count ? `${item.students_count} students` : "—",
  }));

  return <main className="faculty-dashboard">
    <aside className="faculty-sidebar">
      <div className="faculty-brand"><div className="faculty-brand-mark"><img src={logo} alt="NIIS" /></div><div><strong>NIIS</strong><small>FACULTY PORTAL</small></div></div>
      <nav>
        <p className="nav-label">OVERVIEW</p><NavItem active icon={<FaHome />}>Home</NavItem>
        <p className="nav-label teaching-label">TEACHING</p><NavItem icon={<FaCalendarAlt />}>My classes</NavItem>
        <div className="faculty-subnav"><button className="subnav-active">Today's schedule</button><button>Full timetable</button><button>File a DCR</button></div>
        <NavItem icon={<FaRegCommentAlt />}>Lesson plan</NavItem><NavItem icon={<FaClipboardCheck />} badge="3" onClick={() => navigate("/attendance")}>Attendance</NavItem>
        <p className="nav-label academics-label">ACADEMICS</p><NavItem icon={<FaRegFileAlt />}>Assignments</NavItem><NavItem icon={<FaRegWindowMaximize />}>Notes</NavItem><NavItem icon={<FaRegCalendarAlt />}>Events</NavItem>
      </nav>
    </aside>
    <section className="faculty-content">
      <header className="dashboard-topbar"><div><p className="eyebrow">FACULTY DASHBOARD</p><h1>Home</h1><p className="welcome">Good morning, {faculty?.name || "Faculty"}.</p></div><p className="date">{new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date())}</p></header>
      <div className="dashboard-rule" />
      <section className="dashboard-section"><div className="section-title"><h2>Today's classes</h2><button>Full timetable →</button></div>
        <div className="class-list">
          {error && <p className="error login-error">{error}</p>}
          {!error && displayClasses.length === 0 && <p>No assigned classes found.</p>}
          {displayClasses.map((item) => <div className="dashboard-class" key={item.id}><time>{item.time}</time><div className="class-details"><div><h3>{item.subject}</h3><span>SEC {item.section}</span></div><p>{item.detail}</p></div><div className="class-count">{item.count}</div><div className="class-status"><button onClick={() => navigate("/attendance", { state: { classSessionId: item.id, subject: item.subject, section: item.section } })}><b>＋</b> Mark attendance</button></div></div>)}
        </div>
      </section>
      <section className="dashboard-section glance-section"><div className="section-title"><h2>At a glance</h2></div><div className="glance-grid">
        <GlanceCard icon={<FaCalendarAlt />} tone="blue" label="Assigned classes" value={classes.length} note="From the class schedule" />
        <GlanceCard icon={<FaFileAlt />} tone="gold" label="Attendance" value="—" note="Available after records are published" />
        <GlanceCard icon={<FaBookOpen />} tone="teal" label="Faculty ID" value={faculty?.id || "—"} note="Your profile" />
        <GlanceCard icon={<FaClipboardList />} tone="purple" label="Department" value={faculty?.department || "—"} note="Your profile" />
      </div></section>
    </section>
  </main>;
}

function GlanceCard({ icon, tone, label, value, note }) {
  return <article className={`glance-card ${tone}`}><div className="glance-icon">{icon}</div><p>{label}</p><strong>{value}</strong><small>{note}</small></article>;
}
