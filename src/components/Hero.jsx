import "./Hero.css";
import hero from "../assets/college.png";
import {
  FaClipboardCheck,
  FaCalendarAlt,
  FaBook,
  FaBell,
} from "react-icons/fa";

function Hero() {
  let student = {};

  try {
    student = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    student = {};
  }

  const studentName = student.name
    || student.full_name
    || student.fullName
    || [student.first_name || student.firstName, student.last_name || student.lastName].filter(Boolean).join(" ")
    || student.college_email?.split("@")[0]
    || "Student";
  const academicDetails = [
    student.stream || student.course || student.program || student.department,
    student.semester && `Semester ${student.semester}`,
  ].filter(Boolean).join(" • ") || "Student Portal";

  return (
    <section className="hero" style={{ backgroundImage: `url(${hero})` }}>
      <div className="hero-overlay">
        <div className="hero-left">
          <span className="welcome">Welcome Back 👋</span>
          <h1>{studentName}</h1>
          <p>{academicDetails}</p>
          <h3>NIIS Institute of Business Administration</h3>
          <small>Check today&apos;s classes, attendance, assignments and latest updates.</small>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-icon attendance"><FaClipboardCheck /></div>
            <div><h2>Attendance</h2></div>
          </div>
          <div className="hero-card">
            <div className="hero-icon timetable"><FaCalendarAlt /></div>
            <div><h2>Timetable</h2></div>
          </div>
          <div className="hero-card">
            <div className="hero-icon notes"><FaBook /></div>
            <div><h2>Notes</h2></div>
          </div>
          <div className="hero-card">
            <div className="hero-icon notification"><FaBell /></div>
            <div><h2>Notifications</h2></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
