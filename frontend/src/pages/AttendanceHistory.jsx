import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTimes } from "react-icons/fa";
import "../styles/AttendanceHistory.css";
import "../styles/AttendanceHistoryActions.css";
import { attendanceApi } from "../services/AttendanceAPI";
import { studentApi } from "../services/studentApi";

const asList = (value) => Array.isArray(value) ? value : value?.results || value?.data || [];
const timestampFor = (record) => record.updated_at || record.marked_at || record.created_at || record.attendance_date || record.date;
const isEditable = (record) => { const time = new Date(timestampFor(record)).getTime(); return Number.isFinite(time) && Date.now() - time < 86400000; };
const remainingEditTime = (record) => { const milliseconds = new Date(timestampFor(record)).getTime() + 86400000 - Date.now(); if (milliseconds <= 0) return "Locked"; return `${Math.floor(milliseconds / 3600000)}h ${Math.ceil((milliseconds % 3600000) / 60000)}m left`; };

function AttendanceHistory() {
  const [history, setHistory] = useState([]), [loading, setLoading] = useState(true), [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null), [editing, setEditing] = useState(null), [status, setStatus] = useState("Present"), [error, setError] = useState("");
  const load = async () => {
    setLoading(true);
    try {
      const [records, students] = await Promise.all([attendanceApi.history(), studentApi.list()]);
      const byId = new Map(students.map((student) => [String(student.id), student]));
      // The API now applies faculty-level authorization. Do not apply another
      // client-side ID check because marked_by can be a profile ID rather than
      // the authenticated user ID.
      setHistory(asList(records).map((record) => {
        const student = byId.get(String(record.student?.id ?? record.student_id ?? record.student));
        return { ...record, registration_no: record.registration_no || student?.registration_no || student?.roll_number || "-", student_name: record.student_name || student?.name || "-", date: record.date || record.attendance_date || record.marked_at?.split("T")[0] || record.created_at?.split("T")[0] || "-", status: record.status || record.attendance_status || "-" };
      }));
      setError("");
    } catch (err) { setError(err.message || "Unable to load attendance history."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const filtered = history.filter((item) => [item.student_name, item.registration_no, item.status, item.date].some((value) => String(value).toLowerCase().includes(search.toLowerCase())));
  const save = async () => { if (!isEditable(editing)) { setEditing(null); setError("This record is locked after 24 hours."); return; } try { await attendanceApi.update(editing.id, { status }); setEditing(null); load(); } catch (err) { setError(err.message || "Unable to update attendance."); } };
  return <div className="history-page"><div className="history-header"><h1>Attendance History</h1><p>Attendance can be corrected for 24 hours after it is submitted.</p></div><div className="history-toolbar"><div className="search-wrapper"><FaSearch /><input placeholder="Search student or date..." value={search} onChange={(event) => setSearch(event.target.value)} /></div></div>{error && <p className="error login-error">{error}</p>}{loading ? <h3>Loading history...</h3> : <div className="history-card"><table className="history-table"><thead><tr><th>Sl No.</th><th>Registration No.</th><th>Student Name</th><th>Date</th><th>Status</th><th>Edit window</th><th>Action</th></tr></thead><tbody>{filtered.length === 0 ? <tr><td colSpan="7" className="no-data">No attendance records found.</td></tr> : filtered.map((item, index) => <tr key={item.id}><td>{index + 1}</td><td>{item.registration_no}</td><td>{item.student_name}</td><td>{item.date}</td><td><span className={`status ${String(item.status).toLowerCase().replace(/\s+/g, "-")}`}>{item.status}</span></td><td><span className={isEditable(item) ? "edit-window" : "locked-tag"}>{remainingEditTime(item)}</span></td><td><div className="action-buttons"><button className="view-btn" title="View record" onClick={() => setSelected(item)}><FaEye /></button><button className="edit-btn" title={isEditable(item) ? "Edit status" : "Locked after 24 hours"} disabled={!isEditable(item)} onClick={() => { setEditing(item); setStatus(String(item.status).toLowerCase() === "absent" ? "Absent" : "Present"); }}><FaEdit /></button></div></td></tr>)}</tbody></table></div>}{selected && <RecordModal item={selected} onClose={() => setSelected(null)} />}{editing && <div className="modal-overlay"><div className="attendance-modal"><div className="modal-header"><h2>Edit Attendance</h2><button className="close-btn" onClick={() => setEditing(null)}><FaTimes /></button></div><div className="modal-content"><p className="lock-message">You can edit this record for {remainingEditTime(editing)}.</p><label className="history-edit-label">Attendance status<select value={status} onChange={(event) => setStatus(event.target.value)}><option>Present</option><option>Absent</option></select></label><button className="save-edit-btn" onClick={save}>Save changes</button></div></div></div>}</div>;
}
function RecordModal({ item, onClose }) { return <div className="modal-overlay"><div className="attendance-modal"><div className="modal-header"><h2>Attendance Record</h2><button className="close-btn" onClick={onClose}><FaTimes /></button></div><div className="modal-content"><div className="modal-info-grid"><div className="info-box"><h4>Student</h4><p>{item.student_name}</p></div><div className="info-box"><h4>Registration No.</h4><p>{item.registration_no}</p></div><div className="info-box"><h4>Date</h4><p>{item.date}</p></div><div className="info-box"><h4>Status</h4><p>{item.status}</p></div></div><p className={isEditable(item) ? "edit-window" : "locked-tag"}>{isEditable(item) ? `Editing available: ${remainingEditTime(item)}` : "This attendance record is locked."}</p></div></div></div>; }
export default AttendanceHistory;
