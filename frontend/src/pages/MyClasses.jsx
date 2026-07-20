import { useNavigate } from "react-router-dom";
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/MyClasses.css";



import {
  FaUsers,
  FaBook,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const classes = [
  {
    id: 1,
    subject: "Machine Learning",
    course: "MCA",
    semester: "Semester 2",
    section: "A",
    room: "Lab-201",
    time: "10:00 AM - 11:00 AM",
    students: 45,
    status: "Active",
  },
  {
    id: 2,
    subject: "Cloud Computing",
    course: "MCA",
    semester: "Semester 2",
    section: "B",
    room: "Room-302",
    time: "11:30 AM - 12:30 PM",
    students: 42,
    status: "Active",
  },
  {
    id: 3,
    subject: "Operating System",
    course: "BCA",
    semester: "Semester 3",
    section: "A",
    room: "Room-105",
    time: "2:00 PM - 3:00 PM",
    students: 48,
    status: "Upcoming",
  },
];

function MyClasses() {

  const navigate = useNavigate();

  return (
    <div className="attendance-layout">

      <Sidebar />

      <div className="attendance-main">

        <Header />

        <div className="attendance-container">

          <div className="attendance-title">
            <h1>My Classes</h1>
            <p>All assigned classes for the faculty</p>
          </div>

          <div className="classes-grid">

            {classes.map((item) => (

              <div key={item.id} className="class-card">

                <div className="card-top">

                  <div className="subject-icon">
                    <FaBook />
                  </div>

                  <span className={item.status.toLowerCase()}>
                    {item.status}
                  </span>

                </div>

                <h2>{item.subject}</h2>

                <p>
                  {item.course} • {item.semester} • Section {item.section}
                </p>

                <div className="info">

                  <span>
                    <FaClock />
                    {item.time}
                  </span>

                  <span>
                    <FaMapMarkerAlt />
                    {item.room}
                  </span>

                  <span>
                    <FaUsers />
                    {item.students} Students
                  </span>

                </div>

               <button
                 className="take-btn"
                 onClick={() => navigate("/attendance")}
               >
                 Take Attendance
               </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyClasses;