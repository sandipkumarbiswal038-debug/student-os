import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../lib.js";
import StudentAssignmentsPage from "./StudentAssignmentsPage.jsx";
import NotesLibraryPage from "./NotesLibraryPage.jsx";
import FacultyConsolePage from "./FacultyConsolePage.jsx";
import FacultyGradingPage from "./FacultyGradingPage.jsx";
import FacultyStudentGradesPage from "./FacultyStudentGradesPage.jsx";
import ModerationPage from "./ModerationPage.jsx";
import "./NotesAndAssignments.css";

const demoSubjects = [
  { subject_id: "sub-dbms", name: "Database Management Systems" },
  { subject_id: "sub-os", name: "Operating Systems" },
  { subject_id: "sub-web", name: "Web Technologies" },
];

const demoAssignments = [{
  assignment_id: "demo-assignment-1",
  title: "DBMS Lab 3",
  description: "Prepare an ER diagram and SQL schema for the library management system.",
  subject_name: "Database Management Systems",
  deadline: "2026-08-06T17:30:00.000Z",
  allow_resubmit: true,
}];

const demoNotes = [{
  note_id: "demo-note-1",
  title: "OS Unit 3 — Process Scheduling",
  subject_name: "Operating Systems",
  course: "MCA",
  semester: "1",
  topic: "Process Scheduling",
  uploader: "Prof. Meera Sen",
  description: "Study material covering FCFS, SJF, priority, and round-robin scheduling.",
  download_count: 14,
  upvote_count: 5,
  report_count: 0,
  status: "active",
  uploaded_at: "2026-07-28T10:00:00.000Z",
}];

export default function NotesAndAssignments() {
  const location = useLocation();
  const [mode, setMode] = useState(() => location.state?.mode || localStorage.getItem("portalRole") || "student");
  const [page, setPage] = useState(() => (location.state?.mode || localStorage.getItem("portalRole")) === "faculty" ? "console" : "assignments");
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [facultyAssignments, setFacultyAssignments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [grades, setGrades] = useState([]);
  const [reports, setReports] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [noteSort, setNoteSort] = useState("recent");
  const [message, setMessage] = useState("");

  const loadData = useCallback(async () => {
    try {
      const [bootstrap, student, faculty, gradeData, reportData] = await Promise.all([
        fetch(`${api}/bootstrap`).then((r) => r.json()),
        fetch(`${api}/assignments?role=student&userId=stu-001`).then((r) => r.json()),
        fetch(`${api}/assignments?role=faculty&userId=fac-001`).then((r) => r.json()),
        fetch(`${api}/grades?facultyId=fac-001`).then((r) => r.ok ? r.json() : []),
        fetch(`${api}/reports`).then((r) => r.ok ? r.json() : []),
      ]);
      setSubjects(bootstrap.subjects || []);
      setAssignments(student);
      setFacultyAssignments(faculty);
      setSelectedAssignment((current) => current || faculty[0] || null);
      setGrades(gradeData);
      setReports(reportData);
    } catch {
      setSubjects(demoSubjects);
      setAssignments(demoAssignments);
      setFacultyAssignments(demoAssignments);
      setSelectedAssignment(demoAssignments[0]);
      setMessage("Showing sample academic data while the local service is unavailable.");
    }
  }, []);

  const loadNotes = useCallback(async () => {
    try {
      const facultyView = mode === "faculty" ? "&facultyId=fac-001" : "";
      const response = await fetch(`${api}/notes?subjectId=${subjectFilter}&sort=${noteSort}${facultyView}`);
      setNotes(await response.json());
    } catch {
      setNotes(demoNotes);
    }
  }, [mode, noteSort, subjectFilter]);

  const loadSubmissions = useCallback(async (assignment = selectedAssignment) => {
    if (!assignment) return;
    const response = await fetch(`${api}/assignments/${assignment.assignment_id}/submissions`);
    setSubmissions(await response.json());
  }, [selectedAssignment]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadData(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadData]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadNotes(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadNotes]);

  useEffect(() => {
    if (mode !== "faculty") return undefined;
    const timer = window.setTimeout(() => { void loadSubmissions(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadSubmissions, mode]);

  async function submitAssignment(event, assignmentId) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    form.append("student_id", "stu-001");
    const response = await fetch(`${api}/assignments/${assignmentId}/submit`, { method: "POST", body: form });
    setMessage(response.ok ? "Assignment submitted." : "Could not submit the assignment.");
    if (response.ok) loadData();
  }

  async function createAssignment(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    form.set("deadline", new Date(form.get("deadline")).toISOString());
    const response = await fetch(`${api}/assignments`, { method: "POST", body: form });
    setMessage(response.ok ? "Assignment created." : "Could not create the assignment.");
    if (response.ok) { event.currentTarget.reset(); loadData(); }
  }

  async function gradeSubmission(event, submissionId) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`${api}/submissions/${submissionId}/grade`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ grade_value: form.get("grade_value"), feedback: form.get("feedback") }) });
    setMessage(response.ok ? "Grade saved." : "Could not save the grade.");
    if (response.ok) { loadData(); loadSubmissions(); }
  }

  async function uploadNote(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    form.append("uploaded_by", "fac-001");
    const response = await fetch(`${api}/notes`, { method: "POST", body: form });
    setMessage(response.ok ? "Note uploaded." : "Could not upload the note.");
    if (response.ok) { event.currentTarget.reset(); loadNotes(); }
  }

  async function removeAssignment(id) {
    await fetch(`${api}/assignments/${id}?facultyId=fac-001`, { method: "DELETE" });
    setMessage("Assignment deleted.");
    loadData();
  }
  async function noteAction(id, action, body) {
    const response = await fetch(`${api}/notes/${id}${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (response.ok) loadNotes();
  }

  async function resolveReport(reportId, action) {
    const response = await fetch(`${api}/reports/${reportId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setMessage(response.ok ? "Report resolved." : "Could not resolve the report.");
    if (response.ok) loadData();
  }

  const faculty = mode === "faculty";
  const switchMode = (next) => { localStorage.setItem("portalRole", next); setMode(next); setPage(next === "student" ? "assignments" : "console"); };
  return <section className="academic-workspace">
    <div className="academic-toolbar">
      <div><h1>Notes &amp; Assignments</h1><p>Manage course material, submissions, and grades.</p></div>
      <div className="academic-tabs"><button className={!faculty ? "active" : ""} onClick={() => switchMode("student")}>Student view</button><button className={faculty ? "active" : ""} onClick={() => switchMode("faculty")}>Faculty view</button></div>
    </div>
    {message && <p className="academic-message">{message}</p>}
    <nav className="academic-subnav">
      {(!faculty ? [["assignments", "Assignments"], ["notes", "Notes library"]] : [["console", "Assignments"], ["grading", "Grade submissions"], ["notes", "Notes library"], ["grades", "Student grades"], ["moderation", "Moderation"]]).map(([key, label]) => <button key={key} className={page === key ? "active" : ""} onClick={() => setPage(key)}>{label}</button>)}
    </nav>
    {!faculty && page === "assignments" && <StudentAssignmentsPage assignments={assignments} pendingAssignments={assignments.filter((item) => !item.submission_id)} onSubmitAssignment={submitAssignment} />}
    {!faculty && page === "notes" && <NotesLibraryPage subjects={subjects} notes={notes} subjectFilter={subjectFilter} noteSort={noteSort} onSubjectFilterChange={setSubjectFilter} onNoteSortChange={setNoteSort} onDownloadNote={(note) => window.open(`${api}/notes/${note.note_id}/download`, "_blank")} onUpvoteNote={(id) => noteAction(id, "/upvote", { user_id: "stu-001" })} onReportNote={(id) => noteAction(id, "/report", { reason: "Reported by student", reported_by: "stu-001" })} />}
    {faculty && page === "console" && <FacultyConsolePage subjects={subjects} facultyAssignments={facultyAssignments} selectedAssignment={selectedAssignment} onCreateAssignment={createAssignment} onSelectAssignment={setSelectedAssignment} onDeleteAssignment={removeAssignment} />}
    {faculty && page === "grading" && <FacultyGradingPage facultyAssignments={facultyAssignments} selectedAssignment={selectedAssignment} submissions={submissions} onSelectAssignment={setSelectedAssignment} onGradeSubmission={gradeSubmission} />}
    {faculty && page === "notes" && <NotesLibraryPage canUpload isFaculty subjects={subjects} notes={notes} subjectFilter={subjectFilter} noteSort={noteSort} onSubjectFilterChange={setSubjectFilter} onNoteSortChange={setNoteSort} onUploadNote={uploadNote} onDeleteNote={(id) => fetch(`${api}/notes/${id}?facultyId=fac-001`, { method: "DELETE" }).then(loadNotes)} onHideNote={(id) => fetch(`${api}/notes/${id}/visibility`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "hidden", faculty_id: "fac-001" }) }).then(loadNotes)} onRepublishNote={(id) => fetch(`${api}/notes/${id}/visibility`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "active", faculty_id: "fac-001" }) }).then(loadNotes)} />}
    {faculty && page === "grades" && <FacultyStudentGradesPage grades={grades} />}
    {faculty && page === "moderation" && <ModerationPage reports={reports} onResolveReport={resolveReport} />}
  </section>;
}
