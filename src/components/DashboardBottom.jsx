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


</div>
</section>
  );
}

export default DashboardBottom;