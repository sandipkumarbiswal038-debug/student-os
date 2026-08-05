import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaIdCard, FaGraduationCap } from "react-icons/fa";
import { MdClass } from "react-icons/md";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getStudentDashboard } from "../api/studentDashboardApi";
import { getStudentAttendanceSummaries } from "../api/attendanceSummary";
import "../styles/StudentAttendance.css";

const getAttendanceState = (percentage) => {
  if (percentage < 75) return "below";
  if (percentage <= 80) return "watch";
  return "safe";
};

function StudentAttendance() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectsError, setSubjectsError] = useState("");
  const [summaries, setSummaries] = useState(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/student/login", { replace: true });
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!savedUser) {
      navigate("/student/login", { replace: true });
      return;
    }
    setStudent(savedUser);

    let refreshTimer;
    const loadDashboard = async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const { user, subjects: apiSubjects } = await getStudentDashboard(token, savedUser);
        setStudent(user);
        setSubjects(apiSubjects);
        setSummaries(await getStudentAttendanceSummaries(token, user, apiSubjects));
        localStorage.setItem("currentUser", JSON.stringify(user));
        setSubjectsError("");
      } catch (requestError) {
        setSubjectsError(
          requestError.message || "Unable to load assigned subjects right now."
        );
      } finally {
        if (showLoading) setLoading(false);
      }
    };

    loadDashboard();
    // Attendance becomes visible on the student dashboard without requiring logout/login.
    refreshTimer = window.setInterval(() => loadDashboard(false), 30000);
    return () => window.clearInterval(refreshTimer);
  }, [navigate]);

  if (loading) {
    return <main className="student-container"><p>Loading your dashboard...</p></main>;
  }

  const semesterValue = student?.semester || subjects[0]?.semester;
  const semester = semesterValue ? `${semesterValue} Semester` : "Not assigned";

  return (
    <div className="student-layout">
      <Sidebar />
      <div className="student-main">
        <Header />
        <div className="student-container">
          <h1 className="student-title">Student Dashboard</h1>
          <div className="student-info-card">
            <div className="student-info-item"><FaUserGraduate className="student-info-icon" /><h4>Name</h4><p>{student?.name || "-"}</p></div>
            <div className="student-info-item"><FaIdCard className="student-info-icon" /><h4>Regd No.</h4><p>{student?.registration_no || student?.roll_number || "-"}</p></div>
            <div className="student-info-item"><FaGraduationCap className="student-info-icon" /><h4>Course</h4><p>{student?.course || student?.batch || "-"}</p></div>
            <div className="student-info-item"><FaGraduationCap className="student-info-icon" /><h4>Semester</h4><p>{semester}</p></div>
            <div className="student-info-item"><MdClass className="student-info-icon" /><h4>Email</h4><p>{student?.college_email || "-"}</p></div>
          </div>

          <div className="student-table-card">
            <h2>My Subjects</h2>
            {subjectsError && <p className="error login-error">{subjectsError}</p>}
            <div className="student-table-wrapper">
              <table className="student-table">
                <thead><tr><th>Subject</th><th>Code</th><th>Semester</th><th>Attendance</th><th>Action</th></tr></thead>
                <tbody>
                  {subjects.length === 0 ? (
                    <tr><td colSpan="5">No subjects have been assigned to your batch yet.</td></tr>
                  ) : subjects.map((subject) => {
                    const subjectName = subject.name || subject.subject_name || subject.subject || subject.title || subject.subject_title || "-";
                    const subjectCode = subject.code || subject.subject_code || subject.subject_id || "-";
                    const summary = summaries.get(String(subject.id ?? subject.code ?? subject.name)) || { percentage: 0, total: 0 };
                    return (
                    <tr key={subject.id} className={`attendance-${getAttendanceState(summary.percentage)}`}>
                      <td>{subjectName}</td><td>{subjectCode}</td><td>{subject.semester || "-"}</td>
                      <td><div className="student-progress-box"><div className="student-progress"><div className={`student-progress-fill ${summary.percentage < 75 ? "low" : ""}`} style={{ width: `${summary.percentage}%` }} /></div><span>{summary.total ? `${summary.percentage}%` : "--"}</span></div>{summary.total > 0 && summary.percentage < 75 && <small className="attendance-warning">Below 75%</small>}</td>
                      <td><button className="student-view-btn" onClick={() => navigate("/student/subject-details", { state: { subject: { ...subject, name: subjectName, code: subjectCode } } })}>View Details</button></td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendance;
