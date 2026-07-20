import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AttendanceHeader from "../components/AttendanceHeader";
import StudentTable from "../components/StudentTable";
import TodayClasses from "../components/TodayClasses";

import "../styles/FacultyAttendance.css";

function FacultyAttendance() {
  const location = useLocation();

  const selectedClassData = location.state; 

  const [students, setStudents] = useState([]);

  const [showTable, setShowTable] = useState(false);

  const [selectedClass, setSelectedClass] = useState(
  !!selectedClassData
  );

  const [search, setSearch] = useState("");

  const [attendanceInfo, setAttendanceInfo] = useState({
   course: selectedClassData?.course || "",
   semester: selectedClassData?.semester || "",
   section: selectedClassData?.section || "",
   subject: selectedClassData?.subject || "",
   date: new Date().toISOString().split("T")[0],
   time: selectedClassData?.time || "",
 });

  const studentList = [

    {
      id:1,
      roll:"220001",
      name:"Rahul Sharma",
      present:true,
    },

    {
      id:2,
      roll:"220002",
      name:"Priya Das",
      present:false,
    },

    {
      id:3,
      roll:"220003",
      name:"Aman Kumar",
      present:true,
    },

    {
      id:4,
      roll:"220004",
      name:"Sneha Roy",
      present:true,
    },

    {
      id:5,
      roll:"220005",
      name:"Rohit Singh",
      present:false,
    },

  ];

    // ================= Load Students =================

  const handleSelectClass = (selectedClassData) => {
    setSelectedClass(true);
    setAttendanceInfo({
    course: selectedClassData.course,
    semester: selectedClassData.semester,
    section: selectedClassData.section,
    subject: selectedClassData.subject,
    date: new Date().toISOString().split("T")[0],
    time: selectedClassData.time,
  });
};

    const handleLoadStudents = (data) => {

    setAttendanceInfo(data);

    setStudents(studentList);

    setShowTable(true);

  };

  // ================= Search =================

  const filteredStudents = students.filter((student) =>

    student.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    student.roll
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  // ================= Present / Absent =================

  const updateAttendance = (id, isPresent) => {

    const updatedStudents = students.map((student) =>

      student.id === id
        ? {
            ...student,
            present: isPresent,
          }
        : student

    );

    setStudents(updatedStudents);

  };

  // ================= Mark All Present =================

  const markAllPresent = () => {

    const updatedStudents = students.map((student) => ({

      ...student,

      present: true,

    }));

    setStudents(updatedStudents);

  };
    // ================= Back =================

  const backPage = () => {

    setShowTable(false);

    setSelectedClass(false);

    setStudents([]);

    setSearch("");

  };

  // ================= Not Held =================

  const handleNotHeld = () => {

    if (!attendanceInfo.subject) {

      alert("Please load students first.");

      return;

    }

    alert(
      `Class marked as Not Held\n\nSubject : ${attendanceInfo.subject}`
    );

  };

  // ================= Submit Attendance =================

  const saveAttendance = () => {

    if (students.length === 0) {

      alert("Please load students first.");

      return;

    }

    const attendanceData = {

      course: attendanceInfo.course,

      semester: attendanceInfo.semester,

      section: attendanceInfo.section,

      subject: attendanceInfo.subject,

      date: attendanceInfo.date,

      time: attendanceInfo.time,

      students: students.map((student) => ({

        regdNo: student.roll,

        name: student.name,

        status: student.present
          ? "Present"
          : "Absent",

      })),

    };

    console.log("Attendance Data :", attendanceData);

    alert("Attendance Submitted Successfully!");

  };
    

  

  

  return (
  <div className="attendance-layout">

    <Sidebar />

    <div className="attendance-main">

      <Header />

      <div className="attendance-container">

        <div className="attendance-title">

          <h1>Mark Attendance</h1>

        </div>

        {!selectedClass && (
          <TodayClasses onSelectClass={handleSelectClass} />
        )}

        {selectedClass && (
          <AttendanceHeader
            attendanceInfo={attendanceInfo}
            onLoadStudents={handleLoadStudents}
            onNotHeld={handleNotHeld}
          />
        )}

        {showTable && (

          <>

            {/* Search + Mark All Present */}

            <div className="attendance-tools">

              <input
                type="text"
                className="search-box"
                placeholder="🔍 Search Student..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <label className="mark-all-card">

                <input
                  type="checkbox"
                  onChange={markAllPresent}
                />

                <span>Mark All Present</span>

              </label>

            </div>

            <div className="attendance-summary">

              <span>

                Total :
                <b> {students.length}</b>

              </span>

              <span>

                Present :
                <b>
                  {" "}
                  {
                    students.filter(
                      (student) => student.present
                    ).length
                  }
                </b>

              </span>

              <span>

                Absent :
                <b>
                  {" "}
                  {
                    students.filter(
                      (student) => !student.present
                    ).length
                  }
                </b>

              </span>

            </div>

            <StudentTable
              students={filteredStudents}
              updateAttendance={updateAttendance}
              markAllPresent={markAllPresent}
              backPage={backPage}
              saveAttendance={saveAttendance}
            />
                        {/* Bottom Buttons */}

           
              

            

          </>

        )}

      </div>

    </div>

  </div>

);

}

export default FacultyAttendance;