import React from "react";

import "../styles/MyClasses.css";

import {
  FaUsers,
  FaBook,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";


const classes = [

  {
    id:1,
    subject:"Machine Learning",
    course:"MCA",
    semester:"Semester 2",
    section:"A",
    room:"Lab-201",
    time:"10:00 AM - 11:00 AM",
    students:45,
    status:"Active",
  },


  {
    id:2,
    subject:"Cloud Computing",
    course:"MCA",
    semester:"Semester 2",
    section:"B",
    room:"Room-302",
    time:"11:30 AM - 12:30 PM",
    students:42,
    status:"Active",
  },


  {
    id:3,
    subject:"Operating System",
    course:"BCA",
    semester:"Semester 3",
    section:"A",
    room:"Room-105",
    time:"2:00 PM - 3:00 PM",
    students:48,
    status:"Upcoming",
  }


];



function MyClasses({onStartAttendance}) {


return (

<div className="classes-page">


<div className="classes-title">

<h1>
My Classes
</h1>

<p>
View your assigned classes and start attendance
</p>

</div>




<div className="classes-grid">


{

classes.map((item)=>(


<div 
key={item.id}
className="my-class-card"
>



<div className="my-card-top">


<div className="my-subject-icon">

<FaBook />

</div>



<span 
className={
item.status.toLowerCase()
}
>

{item.status}

</span>



</div>





<h2>
{item.subject}
</h2>




<p>

{item.course}

&nbsp; • &nbsp;

{item.semester}

&nbsp; • &nbsp;

Section {item.section}

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

onClick={()=>onStartAttendance(item)}

>

Take Attendance

</button>





</div>


))


}



</div>



</div>


);


}


export default MyClasses;