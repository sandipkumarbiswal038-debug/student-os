import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./DashboardBottom.css";

const sampleSchedule = [
  { subject: "Database Management Systems", time: "09:00 AM – 10:00 AM", room: "Lab 2" },
  { subject: "Operating Systems", time: "11:15 AM – 12:15 PM", room: "Room 204" },
  { subject: "Web Technologies", time: "02:00 PM – 03:00 PM", room: "Lab 1" },
];

const sampleNotifications = [
  { title: "Assignment deadline approaching", message: "Submit DBMS Lab 3 before 6 August.", date: "Today" },
  { title: "Classroom update", message: "Web Technologies will be held in Lab 1.", date: "Today" },
  { title: "Notes available", message: "Process Scheduling notes were uploaded.", date: "Yesterday" },
];

function formatTime(value) {
  if (!value) return "Time to be announced";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function normaliseSchedule(items) {
  return items.slice(0, 3).map((item) => ({
    subject: item.subject_name || item.subject || item.title || item.course_name || "Scheduled class",
    time: item.time || (item.start_time && item.end_time
      ? `${formatTime(item.start_time)} – ${formatTime(item.end_time)}`
      : formatTime(item.start_time || item.start || item.class_time)),
    room: item.room || item.room_no || item.location || "Room to be announced",
  }));
}

function normaliseNotifications(items) {
  return items.slice(0, 3).map((item) => ({
    title: item.title || item.heading || "New announcement",
    message: item.message || item.description || item.content || "View this notification for more details.",
    date: item.date || item.created_at || item.createdAt
      ? new Date(item.date || item.created_at || item.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })
      : "Recent",
  }));
}

function DashboardBottom() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(sampleSchedule);
  const [notifications, setNotifications] = useState(sampleNotifications);

  useEffect(() => {
    let active = true;

    async function loadDashboardData() {
      const [scheduleResult, notificationResult] = await Promise.allSettled([
        api.get("/api/class-sessions/"),
        api.get("/api/notifications/"),
      ]);

      if (!active) return;
      if (scheduleResult.status === "fulfilled" && Array.isArray(scheduleResult.value.data)) {
        setSchedule(normaliseSchedule(scheduleResult.value.data));
      }
      if (notificationResult.status === "fulfilled" && Array.isArray(notificationResult.value.data)) {
        setNotifications(normaliseNotifications(notificationResult.value.data));
      }
    }

    void loadDashboardData();
    return () => { active = false; };
  }, []);

  return (
    <section className="bottom">
      <div className="panel">
        <div className="schedule">
          <div className="panel-header">
            <h2>Today&apos;s Schedule</h2>
            <button className="view-all-btn" onClick={() => navigate("/timetable")}>View All →</button>
          </div>
          {schedule.length ? schedule.map((item, index) => (
            <div className="schedule-item" key={`${item.subject}-${index}`}>
              <strong>{item.subject}</strong>
              <span>{item.time}</span>
              <small>{item.room}</small>
            </div>
          )) : <p className="empty-panel">No classes scheduled for today.</p>}
        </div>
      </div>
      <div className="panel">
        <div className="panel-header">
          <h2>Latest Notifications</h2>
          <button className="view-all-btn" onClick={() => navigate("/notifications")}>View All →</button>
        </div>
        <ul className="notification-list">
          {notifications.length ? notifications.map((notification, index) => (
            <li key={`${notification.title}-${index}`}>
              <div className="notification-title">
                <h4>{notification.title}</h4>
                <span>{notification.message}</span>
              </div>
              <time className="notification-date">{notification.date}</time>
            </li>
          )) : <li className="empty-panel">No new notifications.</li>}
        </ul>
      </div>
    </section>
  );
}

export default DashboardBottom;
