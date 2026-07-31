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


function AttendanceHeader({
  attendanceInfo,
  onLoadStudents,
  onNotHeld,
}) {


const today = new Date();


const [course,setCourse] = useState("");
const [semester,setSemester] = useState("");
const [section,setSection] = useState("");
const [subject,setSubject] = useState("");

const [date,setDate] = useState(
 today.toISOString().split("T")[0]
);

const [time,setTime] = useState("");

const [classSessionId,setClassSessionId] = useState("");



// Auto fill selected class data

useEffect(()=>{


if(!attendanceInfo) return;


setCourse(
 attendanceInfo.course || ""
);


setSemester(
 attendanceInfo.semester || ""
);


setSection(
 attendanceInfo.section || ""
);



setSubject(

 attendanceInfo.subject_name ||

 attendanceInfo.subject ||

 ""

);



setClassSessionId(

 attendanceInfo.classSessionId ||

 attendanceInfo.id ||

 ""

);



if(attendanceInfo.date){

setDate(attendanceInfo.date);

}



if(attendanceInfo.time){

setTime(attendanceInfo.time);

}



},[attendanceInfo]);





const handleLoad=()=>{


if(
!course ||
!semester ||
!section
){

alert("Class information missing");

return;

}



onLoadStudents({

...attendanceInfo,


classSessionId,


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



<div className="header-top">


<div className="header-title">

<h2>
Mark Attendance
</h2>


<p>
Review class details and load students
</p>


</div>



<div className="today-badge">

<FaCalendarAlt/>

<span>
{date}
</span>


</div>



</div>






<div className="header-grid">



{/* COURSE */}

<div className="input-card">


<label>
Course
</label>


<div className="input-group">


<FaUniversity className="input-icon"/>


<input

type="text"

value={course}

readOnly

/>


</div>


</div>






{/* SEMESTER */}

<div className="input-card">


<label>
Semester
</label>


<div className="input-group">


<FaLayerGroup className="input-icon"/>


<input

type="text"

value={semester}

readOnly

/>


</div>


</div>







{/* SECTION */}

<div className="input-card">


<label>
Section
</label>


<div className="input-group">


<FaUsers className="input-icon"/>


<input

type="text"

value={section}

readOnly

/>


</div>


</div>







{/* SUBJECT */}

<div className="input-card">


<label>
Subject
</label>


<div className="input-group">


<FaBook className="input-icon"/>


<input

type="text"

value={subject}

readOnly

/>


</div>


</div>



</div>








<div className="header-grid second-grid">



{/* DATE */}

<div className="input-card">


<label>
Date
</label>


<div className="input-group">


<FaCalendarAlt className="input-icon"/>


<input

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

/>


</div>


</div>








{/* TIME */}

<div className="input-card">


<label>
Time
</label>


<div className="input-group">


<FaClock className="input-icon"/>


<input

type="time"

value={time}

onChange={(e)=>setTime(e.target.value)}

/>


</div>


</div>








<div className="button-card">


<button

className="load-btn"

onClick={handleLoad}

>

Load Students

</button>


</div>








<div className="button-card">


<button

type="button"

className="not-held-btn"

onClick={onNotHeld}

>

Mark Not Held

</button>


</div>





</div>




</div>

);


}


export default AttendanceHeader;