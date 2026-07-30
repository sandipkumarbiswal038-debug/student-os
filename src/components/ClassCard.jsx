import { FaBook, FaClock, FaMapMarkerAlt } from "react-icons/fa";

function ClassCard({
  subject,
  semester,
  time,
  room,
  color,
}) {
  return (
    <div className="class-card">

      <div
        className="class-icon"
        style={{ background: color }}
      >
        <FaBook />
      </div>

      <h3>{subject}</h3>

      <p>{semester}</p>

      <div className="class-info">
        <FaClock />
        <span>{time}</span>
      </div>

      <div className="class-info">
        <FaMapMarkerAlt />
        <span>{room}</span>
      </div>

    </div>
  );
}

export default ClassCard;