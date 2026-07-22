import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AttendanceTabs from "../components/AttendanceTabs";
import TodayClasses from "../components/TodayClasses";
import AttendanceHeader from "../components/AttendanceHeader";
import StudentTable from "../components/StudentTable";
import AttendanceSuccessModal from "../components/AttendanceSuccessModal";

import AttendanceHistory from "./AttendanceHistory";
import MyClasses from "./MyClasses";

import "../styles/FacultyAttendance.css";


function FacultyAttendance() {


  const location = useLocation();

  const selectedClassData = location.state;



  // ================= STATES =================


  const [activeTab,setActiveTab] = useState("attendance");


  const [selectedClass,setSelectedClass] =
  useState(!!selectedClassData);



  const [showTable,setShowTable] =
  useState(false);



  const [showSuccessModal,setShowSuccessModal] =
  useState(false);



  const [students,setStudents] =
  useState([]);



  const [search,setSearch] =
  useState("");




  const [attendanceInfo,setAttendanceInfo] =
  useState({

    course:selectedClassData?.course || "",

    semester:selectedClassData?.semester || "",

    section:selectedClassData?.section || "",

    subject:selectedClassData?.subject || "",

    date:new Date().toISOString().split("T")[0],

    time:selectedClassData?.time || ""

  });





  // ================= STUDENT DATA =================


  const studentList=[


    {
      id:1,
      roll:"220001",
      name:"Rahul Sharma",
      present:true
    },


    {
      id:2,
      roll:"220002",
      name:"Priya Das",
      present:false
    },


    {
      id:3,
      roll:"220003",
      name:"Aman Kumar",
      present:true
    },


    {
      id:4,
      roll:"220004",
      name:"Sneha Roy",
      present:true
    },


    {
      id:5,
      roll:"220005",
      name:"Rohit Singh",
      present:false
    }


  ];





  // ================= SELECT CLASS =================


  const handleSelectClass=(classData)=>{


     // Attendance tab open karo
    setActiveTab("attendance");


    // Class select karo
    setSelectedClass(true);


    setAttendanceInfo({

      course:classData.course,

      semester:classData.semester,

      section:classData.section,

      subject:classData.subject,

      date:new Date().toISOString().split("T")[0],

      time:classData.time

    });


  };







  // ================= LOAD STUDENTS =================


  const handleLoadStudents=(data)=>{


    console.log("LOAD CLICKED", data);

    setAttendanceInfo(data);


    setStudents(studentList);


    setShowTable(true);


  };







  // ================= SEARCH =================


  const filteredStudents =
  students.filter(student=>

    student.name
    .toLowerCase()
    .includes(search.toLowerCase())

    ||

    student.roll
    .toLowerCase()
    .includes(search.toLowerCase())


  );








  // ================= UPDATE =================


  const updateAttendance=(id,status)=>{


    const updated =
    students.map(student=>

      student.id===id

      ?

      {
        ...student,
        present:status
      }

      :

      student


    );


    setStudents(updated);


  };







  // ================= MARK ALL =================


  const markAllPresent=()=>{


    setStudents(

      students.map(student=>({

        ...student,

        present:true

      }))

    );


  };








  // ================= BACK =================


  const backPage=()=>{


    setSelectedClass(false);

    setShowTable(false);

    setStudents([]);

    setSearch("");


  };








  // ================= NOT HELD =================


  const handleNotHeld=()=>{


    alert(
      `Class marked as Not Held\n${attendanceInfo.subject}`
    );


  };







  // ================= SAVE =================


  const saveAttendance=()=>{


    if(students.length===0){

      alert("Please load students first");

      return;

    }



    console.log({

      attendanceInfo,

      students

    });



    setShowSuccessModal(true);


  };







  // ================= CLOSE MODAL =================


  const handleCloseSuccessModal=()=>{


    setShowSuccessModal(false);

    setSelectedClass(false);

    setShowTable(false);

    setStudents([]);

  };









  return (


<div className="attendance-layout">



<Sidebar />



<div className="attendance-main">



<Header />



<AttendanceTabs

activeTab={activeTab}

setActiveTab={setActiveTab}

/>





<div className="attendance-container">





{/* ================= ATTENDANCE ================= */}



{

activeTab==="attendance" &&


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

<b>{students.length}</b>

</span>



<span>

Present :

<b>

{

students.filter(
s=>s.present
).length

}

</b>

</span>




<span>

Absent :

<b>

{

students.filter(
s=>!s.present
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

activeTab==="classes" &&


<MyClasses
  onStartAttendance={handleSelectClass}
 />



}








{/* ================= HISTORY ================= */}



{

activeTab==="history" &&


<AttendanceHistory />



}





</div>



</div>



</div>



  );

}


export default FacultyAttendance;