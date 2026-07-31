import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import "../styles/AttendanceHistory.css";
import "../styles/AttendanceHistoryActions.css";
import { attendanceApi } from "../services/attendanceApi";
import { studentApi } from "../services/studentApi";

const asList = (value) => Array.isArray(value) ? value : value?.results || value?.data || [];

function AttendanceHistory() {
  const [history, setHistory] = useState([]), [loading, setLoading] = useState(true), [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null), [editing, setEditing] = useState(null), [status, setStatus] = useState("Present"), [error, setError] = useState("");
  const load = async () => {
    setLoading(true);
    try {
      const [records, students] = await Promise.all([attendanceApi.history(), studentApi.list()]);
      const byId = new Map(students.map((student) => [String(student.id), student]));
      setHistory(asList(records).map((record) => {
        const student = byId.get(String(record.student?.id ?? record.student_id ?? record.student));
        return { ...record, registration_no: record.registration_no || student?.registration_no || student?.roll_number || "-", student_name: record.student_name || student?.name || "-", date: record.date || record.attendance_date || record.marked_at?.split("T")[0] || "-", status: record.status || record.attendance_status || "-" };
      }));
    } catch (err) { setError(err.message || "Unable to load attendance history."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const filtered = history.filter((item) => [item.student_name, item.registration_no, item.status].some((value) => String(value).toLowerCase().includes(search.toLowerCase())));
  const save = async () => { try { await attendanceApi.update(editing.id, { status }); setEditing(null); load(); } catch (err) { setError(err.message || "Unable to update attendance."); } };
  const remove = async (item) => { if (!window.confirm(`Delete attendance for ${item.student_name}?`)) return; try { await attendanceApi.remove(item.id); load(); } catch (err) { setError(err.message || "Unable to delete attendance."); } };
  return <div className="history-page"><div className="history-header"><h1>Attendance History</h1><p>View, correct, or remove saved attendance records.</p></div><div className="history-toolbar"><div className="search-wrapper"><FaSearch /><input placeholder="Search student..." value={search} onChange={(event) => setSearch(event.target.value)} /></div></div>{error && <p className="error login-error">{error}</p>}{loading ? <h3>Loading history...</h3> : <div className="history-card"><table className="history-table"><thead><tr><th>Sl No.</th><th>Registration No.</th><th>Student Name</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.length === 0 ? <tr><td colSpan="6" className="no-data">No attendance records found.</td></tr> : filtered.map((item, index) => <tr key={item.id}><td>{index + 1}</td><td>{item.registration_no}</td><td>{item.student_name}</td><td>{item.date}</td><td><span className={`status ${String(item.status).toLowerCase()}`}>{item.status}</span></td><td><div className="action-buttons"><button className="view-btn" title="View record" onClick={() => setSelected(item)}><FaEye /></button><button className="edit-btn" title="Edit status" onClick={() => { setEditing(item); setStatus(String(item.status).toLowerCase() === "absent" ? "Absent" : "Present"); }}><FaEdit /></button><button className="delete-btn" title="Delete record" onClick={() => remove(item)}><FaTrash /></button></div></td></tr>)}</tbody></table></div>}{selected && <RecordModal title="Attendance Record" item={selected} onClose={() => setSelected(null)} />}{editing && <div className="modal-overlay"><div className="attendance-modal"><div className="modal-header"><h2>Edit Attendance</h2><button className="close-btn" onClick={() => setEditing(null)}><FaTimes /></button></div><div className="modal-content"><label className="history-edit-label">Attendance status<select value={status} onChange={(event) => setStatus(event.target.value)}><option>Present</option><option>Absent</option></select></label><button className="save-edit-btn" onClick={save}>Save changes</button></div></div></div>}</div>;
}
function RecordModal({ item, onClose }) { return <div className="modal-overlay"><div className="attendance-modal"><div className="modal-header"><h2>Attendance Record</h2><button className="close-btn" onClick={onClose}><FaTimes /></button></div><div className="modal-content"><div className="modal-info-grid"><div className="info-box"><h4>Student</h4><p>{item.student_name}</p></div><div className="info-box"><h4>Registration No.</h4><p>{item.registration_no}</p></div><div className="info-box"><h4>Date</h4><p>{item.date}</p></div><div className="info-box"><h4>Status</h4><p>{item.status}</p></div></div></div></div></div>; }
export default AttendanceHistory;
