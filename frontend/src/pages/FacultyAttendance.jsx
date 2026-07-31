import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AttendanceTabs from "../components/AttendanceTabs";
import TodayClasses from "../components/TodayClasses";
import AttendanceHeader from "../components/AttendanceHeader";
import StudentTable from "../components/StudentTable";
import AttendanceSuccessModal from "../components/AttendanceSuccessModal";

import { attendanceApi } from "../services/attendanceApi";
import { studentApi } from "../services/studentApi";

import AttendanceHistory from "./AttendanceHistory";
import MyClasses from "./MyClasses";

import "../styles/FacultyAttendance.css";
import "../styles/FacultyTheme.css";

function FacultyAttendance() {
  const location = useLocation();

const selectedClassData = location.state;

const [activeTab, setActiveTab] = useState("attendance");

const [selectedClass, setSelectedClass] =
  useState(!!selectedClassData);

const [showTable, setShowTable] =
  useState(false);

const [showSuccessModal, setShowSuccessModal] =
  useState(false);

const [students, setStudents] =
  useState([]);

const [search, setSearch] =
  useState("");

const [submittedSessions, setSubmittedSessions] =
  useState({});

const [isSaving, setIsSaving] =
  useState(false);

  const [attendanceInfo, setAttendanceInfo] = useState({

  classSessionId: selectedClassData?.classSessionId || "",

  course: selectedClassData?.course || "",

  semester: selectedClassData?.semester || "",

  section: selectedClassData?.section || "",

  subject: selectedClassData?.subject || "",

  date:
    selectedClassData?.date ||
    new Date().toISOString().split("T")[0],

  time: selectedClassData?.time || "",

});
// ================= SELECT CLASS =================
const handleSelectClass = (classData) => {

  setActiveTab("attendance");

  setSelectedClass(true);

  setAttendanceInfo({

    classSessionId: classData.id,

    course: classData.course,

    semester: classData.semester,

    section: classData.section,

    subject: classData.subject,

    date: classData.date,

    time: classData.time,

  });

};
// ================= LOAD STUDENTS =================
const handleLoadStudents = async (data) => {

  setAttendanceInfo(data);

  try {

    const response = await studentApi.list();

    console.log("STUDENTS API RESPONSE:", response);


    const formattedStudents = response

      .filter((student) => !data.semester || Number(student.semester) === Number(data.semester))

      .filter(
        (student) =>
          !data.section ||
          student.section === data.section
      )

      .map((student) => ({

        id: student.id,

        apiStudentId: student.id,

        registration_no:
          student.registration_no || student.roll_number || "-",

        student_name:
          student.name ||
          "Unknown Student",

        semester:
          student.semester,

        present:true,

      }));


    setStudents(formattedStudents);

    setShowTable(true);


  }
  catch(error){

    console.error(
      "Student Load Error:",
      error
    );

    alert("Unable to load students.");

  }

};

// ================= SEARCH =================
const filteredStudents = students.filter((student) =>

  student.student_name
    ?.toLowerCase()
    .includes(search.toLowerCase())

  ||

  student.registration_no
    ?.toLowerCase()
    .includes(search.toLowerCase())

);

// ================= UPDATE ATTENDANCE =================
const updateAttendance = (id, status) => {

  const updatedStudents = students.map((student) =>

    student.id === id

      ? {
          ...student,
          present: status,
        }

      : student

  );

  setStudents(updatedStudents);

};

// ================= MARK ALL =================
const markAllPresent = () => {

  setStudents(

    students.map((student) => ({

      ...student,

      present: true,

    }))

  );

};

// ================= BACK =================
const backPage = () => {

  setSelectedClass(false);

  setShowTable(false);

  setStudents([]);

  setSearch("");

};

// ================= NOT HELD =================
const handleNotHeld = () => {

  const sessionKey = [

    attendanceInfo.course,

    attendanceInfo.semester,

    attendanceInfo.section,

    attendanceInfo.subject,

    attendanceInfo.date,

    attendanceInfo.time,

  ].join("|");


  if (submittedSessions[sessionKey]) {

    alert("This attendance is already submitted.");

    return;

  }


  setSubmittedSessions((prev) => ({

    ...prev,

    [sessionKey]: "not-held",

  }));


  alert(
    `Class marked as Not Held.\n${attendanceInfo.subject}`
  );

};

// ================= SAVE ATTENDANCE =================
const saveAttendance = async () => {


  if(students.length === 0){

    alert("Please load students first");

    return;

  }



  const classSessionId = attendanceInfo.classSessionId;



  if(!classSessionId){

    alert("Class session not found.");

    return;

  }



  try {


    setIsSaving(true);



    const attendanceData = students.map((student)=>({


      student: student.apiStudentId,


      class_session: classSessionId,


      status: student.present
        ? "Present"
        : "Absent"



    }));





    console.log(
      "ATTENDANCE DATA:",
      attendanceData
    );





    await Promise.all(attendanceData.map((entry) => attendanceApi.mark(entry)));





    alert(
      "Attendance submitted successfully"
    );


    setShowSuccessModal(true);



  }

  catch(error){


    console.error(
      "Attendance Save Error:",
      error
    );


    alert(
      error.message ||
      "Could not save attendance"
    );


  }

  finally{


    setIsSaving(false);


  }



};
// ================= CLOSE MODAL =================
const handleCloseSuccessModal = () => {

  setShowSuccessModal(false);

  setSelectedClass(false);

  setShowTable(false);

  setStudents([]);

};
return (

<div className="attendance-layout">


<Sidebar variant="faculty" />


<div className="attendance-main">


<Header variant="faculty" />


<section className="attendance-page-head">

  <div>

    <p className="page-eyebrow">
      FACULTY PORTAL
    </p>

    <h1>
      Attendance
    </h1>

    <p className="page-description">
      Manage today's classes and record student attendance.
    </p>

  </div>


  <div className="page-date">

    <span>
      Academic session
    </span>

    <strong>
      2025–26
    </strong>

  </div>


</section>



<AttendanceTabs

activeTab={activeTab}

setActiveTab={setActiveTab}

/>



<div className="attendance-container">
   
  {/* ================= ATTENDANCE ================= */}

{
activeTab === "attendance" &&

<>

{

!selectedClass &&

<TodayClasses

onSelectClass={handleSelectClass}

/>

}



{

selectedClass &&

<AttendanceHeader

attendanceInfo={attendanceInfo}

onLoadStudents={handleLoadStudents}

onNotHeld={handleNotHeld}

/>

}
{

showTable &&

<>

<div className="attendance-tools">


<input

className="search-box"

placeholder="Search Student..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<label className="mark-all-card">


<input

type="checkbox"

onChange={markAllPresent}

/>


Mark All Present


</label>


</div>




<div className="attendance-summary">


<span>

Total :

<b>
{students.length}
</b>

</span>



<span>

Present :

<b>

{
students.filter(
(student)=>student.present
).length
}

</b>

</span>




<span>

Absent :

<b>

{
students.filter(
(student)=>!student.present
).length
}

</b>

</span>


</div>





<StudentTable

students={filteredStudents}

updateAttendance={updateAttendance}

backPage={backPage}

saveAttendance={saveAttendance}

isSaving={isSaving}

/>





<AttendanceSuccessModal

open={showSuccessModal}

attendanceInfo={attendanceInfo}

students={students}

onClose={handleCloseSuccessModal}

/>



</>

}
</>

}

{/* ================= MY CLASSES ================= */}


{

activeTab === "classes" &&


<MyClasses

onStartAttendance={handleSelectClass}

/>


}

{/* ================= HISTORY ================= */}


{

activeTab === "history" &&


<AttendanceHistory />


}
</div>


</div>


</div>

);

}


export default FacultyAttendance;
