import "./QuickStats.css";
import { FaUserCheck, FaBookOpen, FaTasks, FaAward } from "react-icons/fa";

const stats = [
  {
    title: "Attendance",
    value: "92%",
    icon: <FaUserCheck />,
  },
  {
    title: "Courses",
    value: "8",
    icon: <FaBookOpen />,
  },
  {
    title: "Assignments",
    value: "12",
    icon: <FaTasks />,
  },
  {
    title: "Achievements",
    value: "5",
    icon: <FaAward />,
  },
];

function QuickStats() {
  return (
    <section className="quick-stats">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-icon">{item.icon}</div>

          <div>
            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default QuickStats;