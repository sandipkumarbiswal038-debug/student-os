import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaIdCard, FaGraduationCap } from "react-icons/fa";
import { MdClass } from "react-icons/md";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getStudentDashboard } from "../api/studentDashboardApi";
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

    const loadDashboard = async () => {
      try {
        const { user, subjects: apiSubjects } = await getStudentDashboard(token, savedUser);
        setStudent(user);
        setSubjects(apiSubjects);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } catch (requestError) {
        setSubjectsError(
          requestError.message || "Unable to load assigned subjects right now."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
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
                <thead><tr><th>Subject</th><th>Code</th><th>Semester</th><th>Action</th></tr></thead>
                <tbody>
                  {subjects.length === 0 ? (
                    <tr><td colSpan="4">No subjects have been assigned to your batch yet.</td></tr>
                  ) : subjects.map((subject) => {
                    const subjectName = subject.name || subject.subject_name || subject.subject || "-";
                    const subjectCode = subject.code || subject.subject_code || subject.subject_id || "-";
                    return (
                    <tr key={subject.id} className={`attendance-${getAttendanceState(100)}`}>
                      <td>{subjectName}</td><td>{subjectCode}</td><td>{subject.semester || "-"}</td>
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
