import { useNavigate } from "react-router-dom";
import "./DashboardCards.css";

import {
  FaCalendarCheck,
  FaBook,
  FaBell,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";

const cards = [
  {
    title: "Attendance",
    icon: <FaCalendarCheck />,
    desc: "View attendance records",
    color: "#67C96B",
    bg: "#ECFDF3",
    path: "/attendance",
  },

  {
    title: "Timetable",
    icon: <FaCalendarAlt />,
    desc: "Today's class schedule",
    color: "#5AA9F5",
    bg: "#EDF6FF",
    path: "/timetable",
  },

  {
    title: "Notes & Assignments",
    icon: <FaBook />,
    desc: "Study notes and assignments",
    color: "#F6C445",
    bg: "#FFF8E6",
    path: "/notes",
  },

  {
    title: "Events",
    icon: <FaClipboardList />,
    desc: "Upcoming college events",
    color: "#9B6BFF",
    bg: "#F5F0FF",
    path: "/events",
  },

  {
    title: "Notifications",
    icon: <FaBell />,
    desc: "Latest announcements",
    color: "#EC5A8E",
    bg: "#FFF0F5",
    path: "/notifications",
  },
];

function DashboardCards() {
  const navigate = useNavigate();

  return (
    <section className="cards">
      {cards.map((card, index) => (
        <div
          className="card"
          key={index}
          onClick={() => navigate(card.path)}
          style={{
            background: card.bg,
            "--card-color": card.color,
          }}
        >
          <div
            className="card-icon"
            style={{
              background: card.color,
              boxShadow: `0 10px 20px ${card.color}55`,
            }}
          >
            {card.icon}
          </div>

          <h3>{card.title}</h3>

          <p>{card.desc}</p>

          <button
            style={{
              background: card.color,
            }}
          >
            Open
          </button>
        </div>
      ))}
    </section>
  );
}

export default DashboardCards;