import "../styles/TodayClasses.css";
import {
  FaBookOpen,
  FaClock,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

function TodayClasses({ onSelectClass }) {

  const todayClasses = [
    {
      id: 1,
      course: "MCA",
      semester: "Semester 2",
      section: "A",
      subject: "Machine Learning",
      time: "10:00 AM - 11:00 AM",
      students: 45,
      status: "Ongoing",
    },
    {
      id: 2,
      course: "MCA",
      semester: "Semester 2",
      section: "B",
      subject: "Cyber Security",
      time: "11:30 AM - 12:30 PM",
      students: 42,
      status: "Upcoming",
    },
    {
      id: 3,
      course: "BCA",
      semester: "Semester 3",
      section: "A",
      subject: "Operating System",
      time: "2:00 PM - 3:00 PM",
      students: 48,
      status: "Upcoming",
    },
  ];

  return (
    <div className="today-classes">

      <div className="today-header">

        <div>
          <h2>Today's Classes</h2>
          <p>Select a class to start attendance</p>
        </div>

      </div>

      <div className="class-grid">

        {todayClasses.map((item) => (

          <div
            key={item.id}
            className="today-class-card"
          >

            <div className="card-top">

              <div className="subject-icon">
                <FaBookOpen />
              </div>

              <span
                className={
                  item.status === "Ongoing"
                    ? "status ongoing"
                    : "status upcoming"
                }
              >
                {item.status}
              </span>

            </div>

            <h3>{item.subject}</h3>

            <p className="course">

              {item.course} • {item.semester} • Section {item.section}

            </p>

            <div className="info-row">

              <span>

                <FaClock />

                {item.time}

              </span>

              <span>

                <FaUsers />

                {item.students} Students

              </span>

            </div>

            <button
              className="attendance-btn"
              onClick={() => onSelectClass(item)}
            >

              Take Attendance

              <FaArrowRight />

            </button>

          </div>

        ))}

      </div>

    </div>
  );

}

export default TodayClasses;