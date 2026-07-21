import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Welcome Section */}
      <div className="welcome-card">
        <div>
          <h1>Welcome Back 👋</h1>
          <p>Student Event Management Dashboard</p>
        </div>

        <div className="student-avatar">
          🎓
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-container">

        <div className="stat-card">
          <h2>08</h2>
          <p>Total Events</p>
        </div>

        <div className="stat-card">
          <h2>05</h2>
          <p>Registered Events</p>
        </div>

        <div className="stat-card">
          <h2>02</h2>
          <p>Cancelled</p>
        </div>

        <div className="stat-card">
          <h2>01</h2>
          <p>Waitlisted</p>
        </div>

      </div>

      {/* Upcoming Events */}

      <div className="dashboard-section">

        <h2>Upcoming Events</h2>

        <div className="event-list">

          <div className="dashboard-event">
            <h3>Hackathon 2026</h3>
            <p>📅 10 Aug 2026</p>
            <p>📍 Computer Lab</p>
          </div>

          <div className="dashboard-event">
            <h3>AI Workshop</h3>
            <p>📅 15 Aug 2026</p>
            <p>📍 Seminar Hall</p>
          </div>

          <div className="dashboard-event">
            <h3>Sports Meet</h3>
            <p>📅 22 Aug 2026</p>
            <p>📍 College Ground</p>
          </div>

        </div>

      </div>

      {/* Notifications */}

      <div className="dashboard-section">

        <h2>Recent Notifications</h2>

        <ul className="notification-list">
          <li>✅ Registered for AI Workshop</li>
          <li>🎉 Hackathon starts in 2 days</li>
          <li>📢 Sports Meet registration is open</li>
        </ul>

      </div>

    </div>
  );
}

export default Dashboard;