import React, { useEffect, useState } from "react";

import "../styles/MyClasses.css";

import {
  FaUsers,
  FaBook,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { classApi } from "../services/classApi";



function MyClasses({onStartAttendance}) {


const [classes,setClasses] = useState([]);

const [loading,setLoading] = useState(true);





// ================= FETCH CLASSES =================


useEffect(()=>{


const fetchClasses = async()=>{


try{


const response = await classApi.list();

console.log("CLASS API DATA:",response);





const formatted = response.map((item)=>(


{


id:item.id,


subject:
item.subject_name || 
item.subject || 
"Subject",



course:item.course_name || item.course,


semester:
`Semester ${item.semester}`,


section:item.section,


room:
item.room || "Not Assigned",



time:
`${item.start_time} - ${item.end_time}`,



students:
item.students_count || 0,



status:"Active",



}



));



setClasses(formatted);



}

catch(error){


console.error(
"Class fetch error",
error
);


}



finally{


setLoading(false);


}



};



fetchClasses();


},[]);







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






{

loading &&

<h3>
Loading Classes...
</h3>


}







{

!loading && classes.length===0 &&

<h3>
No classes found
</h3>


}









<div className="classes-grid">





{

classes.map((item)=>(


<div

key={item.id}

className="my-class-card"

>





<div className="my-card-top">



<div className="my-subject-icon">

<FaBook/>

</div>





<span className="active">

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

<FaClock/>

{item.time}

</span>





<span>

<FaMapMarkerAlt/>

{item.room}

</span>







<span>

<FaUsers/>

{item.students} Students

</span>





</div>









<button

className="take-btn"

onClick={()=>onStartAttendance({

...item,

classSessionId:item.id

})}

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
