import "../styles/StudentTable.css";


function StudentTable({

  students,
  updateAttendance,
  backPage,
  saveAttendance,
  isSaving,

}) {


return (

<div className="student-table-card">


<table className="student-table">


<thead>

<tr>

<th>Sl No.</th>

<th>Regd No</th>

<th>Student Name</th>

<th>Status</th>

</tr>

</thead>



<tbody>


{
students.length === 0 ?


(

<tr>

<td 
colSpan="4" 
className="no-data"
>

No students found.

</td>

</tr>

)


:


students.map((student,index)=>(


<tr key={student.id}>


<td>

{index+1}

</td>



<td>

{student.roll}

</td>




<td>

{student.name}

</td>





<td>


<div className="status-toggle">


<button

className={
student.present
?
"toggle-btn active-present"
:
"toggle-btn"
}


onClick={()=>updateAttendance(
student.id,
true
)}

>

Present

</button>





<button

className={
!student.present
?
"toggle-btn active-absent"
:
"toggle-btn"
}


onClick={()=>updateAttendance(
student.id,
false
)}

>

Absent

</button>



</div>



</td>



</tr>



))

}



</tbody>


</table>





<div className="table-buttons">


<button

className="back-btn"

onClick={backPage}

>

← Back

</button>



<button

className="submit-btn"

onClick={saveAttendance}
disabled={isSaving}

>

Submit Attendance →

</button>



</div>



</div>


);


}


export default StudentTable;