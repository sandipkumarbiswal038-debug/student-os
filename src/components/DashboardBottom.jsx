import "./DashboardBottom.css";
import { useNavigate } from "react-router-dom";
function DashboardBottom() {

  const navigate = useNavigate();
  return (
    <section className="bottom">

      {/* Schedule */}

      <div className="panel">

        <h2>📅 Today's Schedule</h2>

        <div className="schedule">

          <div>
            <span>09:00 AM</span>
            <h4>Web Technology</h4>
          </div>

          <div>
            <span>11:00 AM</span>
            <h4>Python Lab</h4>
          </div>

          <div>
            <span>02:00 PM</span>
            <h4>Machine Learning</h4>
          </div>

        </div>

      </div>

      

      {/* Notification */}

      <div className="panel">

  <div className="panel-header">

  <h2>🔔 Latest Notifications</h2>

  <button
    className="view-all-btn"
    onClick={() => navigate("/notifications")}
  >
    View All →
  </button>

</div>

  <ul className="notification-list">

    <li>

      <div className="notification-title">

        <h4>Hackathon Registration Open</h4>

        <span>Registration closes tomorrow</span>

      </div>

      <div className="notification-date">
        10 Jul
      </div>

    </li>

    <li>

      <div className="notification-title">

        <h4>Python Assignment Due</h4>

        <span>Submit before 5 PM</span>

      </div>

      <div className="notification-date">
        09 Jul
      </div>

    </li>

    <li>

      <div className="notification-title">

        <h4>Library Closed</h4>

        <span>Sunday Holiday</span>

      </div>

      <div className="notification-date">
        08 Jul
      </div>

    </li>

    <li>

      <div className="notification-title">

        <h4>Internal Exam Starts</h4>

        <span>Semester IV</span>

      </div>

      <div className="notification-date">
        20 Jul
      </div>

    </li>

  </ul>

</div>
</section>
  );
}

export default DashboardBottom;