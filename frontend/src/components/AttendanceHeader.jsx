import React, { useEffect, useState } from "react";
import {
  FaUniversity,
  FaBook,
  FaLayerGroup,
  FaUsers,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

import "../styles/AttendanceHeader.css";

const courseData = {
  BCA: {
    semesters: ["1", "2", "3", "4", "5", "6"],
    subjects: [
      "Data Structures",
      "DBMS",
      "Operating System",
      "Java Programming",
      "Web Technology",
    ],
    sections: ["A", "B", "C"],
  },

  MCA: {
    semesters: ["1", "2", "3", "4"],
    subjects: [
      "Advanced Java",
      "Cloud Computing",
      "Machine Learning",
    ],
    sections: ["A", "B"],
  },

  BBA: {
    semesters: ["1", "2", "3", "4", "5", "6"],
    subjects: [
      "Marketing",
      "Finance",
      "HR Management",
    ],
    sections: ["A", "B"],
  },
};

function AttendanceHeader({
  attendanceInfo,
  onLoadStudents,
  onNotHeld,
}) {

  const today = new Date();

  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");

  const [date, setDate] = useState(
    today.toISOString().split("T")[0]
  );

  const [time, setTime] = useState("");

  // Auto Update Time
  useEffect(() => {

    const updateClock = () => {

      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      setTime(`${hours}:${minutes}`);

    };

    updateClock();

    const timer = setInterval(updateClock, 60000);

    return () => clearInterval(timer);

  }, []);

  // Auto Fill Data
  useEffect(() => {

    if (!attendanceInfo) return;

    setCourse(attendanceInfo.course || "");
    setSemester(attendanceInfo.semester || "");
    setSection(attendanceInfo.section || "");
    setSubject(attendanceInfo.subject || "");

    if (attendanceInfo.date) {
      setDate(attendanceInfo.date);
    }

    if (attendanceInfo.time) {
      setTime(attendanceInfo.time);
    }

  }, [attendanceInfo]);

  const semesters =
    courseData[course]?.semesters || [];

  const subjects =
    courseData[course]?.subjects || [];

  const sections =
    courseData[course]?.sections || [];

  // Load Students
  const handleLoad = () => {

    if (
      !course ||
      !semester ||
      !section ||
      !subject
    ) {
      alert("Please fill all fields.");
      return;
    }

    onLoadStudents({
      course,
      semester,
      section,
      subject,
      date,
      time,
    });

  };

  return (

    <div className="attendance-header">

      {/* Row 1 */}

      <div className="header-row">

        <div className="input-group">

          <FaUniversity className="input-icon" />

          <select
            value={course}
            onChange={(e) => {

              setCourse(e.target.value);

              setSemester("");
              setSection("");
              setSubject("");

            }}
          >

            <option value="">Course</option>

            {Object.keys(courseData).map((item) => (

              <option key={item} value={item}>
                {item}
              </option>

            ))}

          </select>

        </div>

        <div className="input-group">

          <FaLayerGroup className="input-icon" />

          <select
            value={semester}
            onChange={(e) =>
              setSemester(e.target.value)
            }
          >

            <option value="">Semester</option>

            {semesters.map((item) => (

              <option key={item} value={item}>
                Semester {item}
              </option>

            ))}

          </select>

        </div>

        <div className="input-group">

          <FaUsers className="input-icon" />

          <select
            value={section}
            onChange={(e) =>
              setSection(e.target.value)
            }
          >

            <option value="">Section</option>

            {sections.map((item) => (

              <option key={item} value={item}>
                Section {item}
              </option>

            ))}

          </select>

        </div>

        <div className="input-group">

          <FaBook className="input-icon" />

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          >

            <option value="">Subject</option>

            {subjects.map((item) => (

              <option key={item} value={item}>
                {item}
              </option>

            ))}

          </select>

        </div>

      </div>

      {/* Row 2 */}

      <div className="header-row">

        <div className="input-group">

          <FaCalendarAlt className="input-icon" />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>

        <div className="input-group">

          <FaClock className="input-icon" />

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          />

        </div>

        <button
          className="load-btn"
          onClick={() => onLoadStudents(attendanceInfo)}
        >
          Load Students
        </button>

        <button
          type="button"
          className="not-held-btn"
          onClick={onNotHeld}
        >
          Not Held
        </button>

      </div>

    </div>

  );

}

export default AttendanceHeader;