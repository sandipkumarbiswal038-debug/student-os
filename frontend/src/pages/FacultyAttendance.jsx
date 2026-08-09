import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AttendanceTabs from "../components/AttendanceTabs";
import TodayClasses from "../components/TodayClasses";
import AttendanceHeader from "../components/AttendanceHeader";
import StudentTable from "../components/StudentTable";
import AttendanceSuccessModal from "../components/AttendanceSuccessModal";

import { attendanceApi } from "../services/AttendanceAPI";
import { studentApi } from "../services/studentApi";
import { classApi } from "../services/classApi";

import AttendanceHistory from "./AttendanceHistory";
import MyClasses from "./MyClasses";

import "../styles/FacultyAttendance.css";
import "../styles/FacultyTheme.css";

function FacultyAttendance() {
  const location = useLocation();

const localToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const attendanceSessionId = (record) =>
  record.class_session?.id ?? record.class_session_id ?? record.class_session?.pk ?? record.class_session;

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
  useState(() => {
    try { return JSON.parse(localStorage.getItem("facultyAttendanceSessions") || "{}"); }
    catch { return {}; }
  });

// Submission status comes from the backend, so it stays correct after a
// refresh, a different browser, or another faculty session.
const [submittedClassSessionIds, setSubmittedClassSessionIds] = useState(() => new Set());

const refreshSubmittedClassSessions = async () => {
  try {
    const records = await attendanceApi.history();
    const entries = Array.isArray(records) ? records : records?.results || records?.data || [];
    setSubmittedClassSessionIds(new Set(
      entries
        .map(attendanceSessionId)
        .filter((id) => id !== undefined && id !== null)
        .map(String)
    ));
  } catch (error) {
    // Do not block attendance if the history request is temporarily unavailable.
    console.error("Unable to check submitted attendance:", error);
  }
};

useEffect(() => {
  refreshSubmittedClassSessions();
}, []);

const [isSaving, setIsSaving] =
  useState(false);

const rememberSession = (key, value) => {
  setSubmittedSessions((previous) => {
    const next = { ...previous, [key]: value };
    localStorage.setItem("facultyAttendanceSessions", JSON.stringify(next));
    return next;
  });
};

const sessionKey = (info) => [
  info.course, info.semester, info.section, info.subject, info.date, info.time,
].join("|");

  const [attendanceInfo, setAttendanceInfo] = useState({

  classSessionId: selectedClassData?.classSessionId || "",

  course: selectedClassData?.course || "",

  semester: selectedClassData?.semester || "",

  section: selectedClassData?.section || "",

  subject: selectedClassData?.subject || "",

  date:
    selectedClassData?.date ||
    localToday(),

  time: selectedClassData?.time || "",

});

// Dashboard cards only need to send a session ID. Resolve the complete
// session again from today's schedule so all fields always match the class
// that was clicked, even if the dashboard was open before a schedule change.
useEffect(() => {
  const sessionId = selectedClassData?.classSessionId;
  if (!sessionId) return;

  classApi.listToday()
    .then((sessions) => {
      const session = sessions.find((item) => String(item.id) === String(sessionId));
      if (!session) return;

      setAttendanceInfo((previous) => ({
        ...previous,
        classSessionId: session.id,
        course: session.course_name || session.course || "",
        semester: session.semester ?? "",
        section: session.section || "",
        subject: session.subject_name || session.subject || "",
        date: localToday(),
        time: session.start_time || "",
        endTime: session.end_time || "",
      }));
    })
    .catch((error) => console.error("Unable to resolve today's selected class:", error));
}, [selectedClassData?.classSessionId]);
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

// Faculty can either select one of today's class cards (which fills these
// values automatically) or open the same form and choose a session manually.
const handleManualAttendance = () => {
  setActiveTab("attendance");
  setSelectedClass(true);
  setShowTable(false);
  setStudents([]);
  setSearch("");
  setAttendanceInfo({
    classSessionId: "",
    course: "",
    semester: "",
    section: "",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    endTime: "",
  });
};
// ================= LOAD STUDENTS =================
const handleLoadStudents = async (data) => {

  setAttendanceInfo(data);

  try {

    const classSessionId = data.classSessionId;
    if (!classSessionId) throw new Error("Please select a class before loading students.");
    const response = await studentApi.classRoll(classSessionId, data.course);

    console.log("STUDENTS API RESPONSE:", response);


    // User API is the source of truth for the database student list.
    const formattedStudents = response.map((student) => ({

        id: student.id,

        // A class-roll entry can have its own row ID. Submit the underlying
        // student/user ID so attendance cannot be written for another person.
        apiStudentId:
          student.student?.id ??
          student.student_id ??
          student.user?.id ??
          student.user_id ??
          student.id,

        registration_no:
          student.registration_no || student.roll_number || "-",

        student_name:
          student.student?.name ||
          student.user?.name ||
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

// ================= BACK =================
const backPage = () => {

  setSelectedClass(false);

  setShowTable(false);

  setStudents([]);

  setSearch("");

};

// ================= NOT HELD =================
const handleNotHeld = () => {

  const key = sessionKey(attendanceInfo);


  if (submittedClassSessionIds.has(String(attendanceInfo.classSessionId))) {

    alert("This attendance is already submitted.");

    return;

  }


  rememberSession(key, "not-held");


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

  const key = sessionKey(attendanceInfo);
  if (submittedClassSessionIds.has(String(classSessionId))) {
    alert("Attendance for this class has already been submitted.");
    return;
  }



  try {


    setIsSaving(true);



    const attendanceData = students.map((student)=>({
      student_id: student.apiStudentId,
      status: student.present ? "Present" : "Absent"
    }));

    if (attendanceData.some((entry) => entry.student_id === undefined || entry.student_id === null || entry.student_id === "")) {
      throw new Error("One or more students do not have a valid student ID for this class session.");
    }





    console.log(
      "ATTENDANCE DATA:",
      attendanceData
    );





    await attendanceApi.submit(classSessionId, attendanceData);

    rememberSession(key, "submitted");
    setSubmittedClassSessionIds((previous) => new Set([...previous, String(classSessionId)]));
    // Student dashboards poll this shared API every 30 seconds. This timestamp
    // also lets another open tab refresh immediately on its next API check.
    localStorage.setItem("attendanceLastUpdated", new Date().toISOString());

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
      {showTable ? `${attendanceInfo.subject || "Attendance"}${attendanceInfo.section ? ` · Sec ${attendanceInfo.section}` : ""}` : "Attendance"}
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
      2026–27
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

onManualAttendance={handleManualAttendance}

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



</div>



<div className="attendance-class-summary" aria-label="Selected class details">
  <div><small>Course</small><strong>{attendanceInfo.course || "-"}</strong></div>
  <div><small>Semester</small><strong>{attendanceInfo.semester || "-"}</strong></div>
  <div><small>Section</small><strong>{attendanceInfo.section || "-"}</strong></div>
  <div><small>Subject</small><strong>{attendanceInfo.subject || "-"}</strong></div>
  <div><small>Date</small><strong>{attendanceInfo.date || "-"}</strong></div>
  <div><small>Time</small><strong>{attendanceInfo.time || "-"}{attendanceInfo.endTime ? ` - ${attendanceInfo.endTime}` : ""}</strong></div>
</div>



<div className="attendance-summary">


<span>

Total :

<b>
{students.length}
</b>

</span>

<span>

Not Held :

<b>
{Object.values(submittedSessions).filter((value) => value === "not-held").length}
</b>

<small> (not included in total)</small>

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


<AttendanceHistory classSessionId={attendanceInfo.classSessionId} />


}
</div>


</div>


</div>

);

}


export default FacultyAttendance;
