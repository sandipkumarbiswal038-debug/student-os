import React from "react";
import "../styles/TodayClasses.css";
import { FaArrowRight, FaCheckCircle, FaClock } from "react-icons/fa";


const classes = [
  {
    id: 1,
    time: "09:00",
    subject: "Data Structures",
    section: "SEC A",
    room: "Room 204",
    type: "Theory",
    status: "Pending",
  },
  {
    id: 2,
    time: "11:00",
    subject: "DBMS Lab",
    section: "SEC B",
    room: "Lab 3",
    type: "Practical",
    status: "Completed",
  },
  {
    id: 3,
    time: "14:00",
    subject: "Operating Systems",
    section: "SEC A",
    room: "Room 108",
    type: "Theory",
    status: "Upcoming",
  },
];

export default function TodayClasses({onSelectClass}) {
  
  return (
    <div className="today-page">

      <div className="today-header">
        <h2>Today's Classes</h2>

        <button className="today-link">
          View Schedule <FaArrowRight />
        </button>
      </div>

      {/* ONE WHITE CONTAINER */}
      <div className="class-container">

        {classes.map((item) => (

          <div className="class-row" key={item.id}>

            <div className="class-time">
              {item.time}
            </div>

            <div className="class-info">

              <div className="title-row">
                <h3>{item.subject}</h3>

                <span className="section">
                  {item.section}
                </span>
              </div>

              <p>
                {item.room} • {item.type}
              </p>

            </div>

            <div className="status">

              {item.status === "Pending" && (
                <span className="pending">
                  <FaClock /> Pending
                </span>
              )}

              {item.status === "Completed" && (
                <span className="completed">
                  <FaCheckCircle /> Completed
                </span>
              )}

              {item.status === "Upcoming" && (
                <span className="upcoming">
                  Upcoming
                </span>
              )}

            </div>

            <div className="action">

              {item.status === "Pending" && (
                <button
                 className="mark-btn"
                 onClick={()=>onSelectClass(item)}
                >
                 Mark Attendance
                </button>
              )}

              {item.status === "Completed" && (
                <button className="view-btn">
                  View Attendance
                </button>
              )}

              {item.status === "Upcoming" && (
                <button className="disable-btn">
                  Upcoming
                </button>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}