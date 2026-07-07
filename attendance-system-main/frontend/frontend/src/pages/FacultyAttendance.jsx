import React from "react";
import { facultyData, classRoll } from "../data/mockData";
import "../styles/FacultyAttendance.css";
function FacultyAttendance() {
    return (
        <div className="faculty-container">
                 <h1 className="title">
            Faculty Attendance
            </h1>
            <div className="faculty-card">

    <h2>Class Details</h2>

    <p>
        <strong>Subject:</strong> {facultyData.subject}
    </p>

    <p>
        <strong>Date:</strong> {facultyData.date}
    </p>

</div>
<div className="attendance-list">

    <h2>Mark Attendance</h2>

    <table>

        <thead>

            <tr>
                <th>Roll No</th>

                <th>Student Name</th>

                <th>Present</th>

                <th>Absent</th>

            </tr>

        </thead>

        <tbody>

            {classRoll.map((student) => (

                <tr key={student.id}>

                    <td>{student.rollNo}</td>

                    <td>{student.name}</td>

                    <td>
                        <input
                         type="radio"
                         name={`attendance-${student.id}`}
                         value="present" 
                         
                         
                         />
                    </td>

                    <td>
                        <input
                         type="radio"
                         name={`attendance-${student.id}`} 
                         value="Absent"
                         />
                    </td>

                </tr>

            ))}

        </tbody>

    </table>
            <div className="button-container">
    <button className="save-btn">
        Save Attendance
    </button>
</div>

</div>

        </div>
    );
}
export default  FacultyAttendance;