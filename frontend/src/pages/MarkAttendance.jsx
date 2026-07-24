import React, { useState } from "react";
import "../styles/MarkAttendance.css";


const initialStudents = [

    {
        id:1,
        roll:"22BCA001",
        name:"Rahul Sharma",
        status:"Present"
    },

    {
        id:2,
        roll:"22BCA002",
        name:"Priya Das",
        status:"Present"
    },

    {
        id:3,
        roll:"22BCA003",
        name:"Aman Kumar",
        status:"Absent"
    },

    {
        id:4,
        roll:"22BCA004",
        name:"Sneha Roy",
        status:"Present"
    },

    {
        id:5,
        roll:"22BCA005",
        name:"Rohit Singh",
        status:"Absent"
    }

];



function MarkAttendance(){


    const [students,setStudents] = useState(initialStudents);



    // Change Present / Absent

    const changeStatus=(id,status)=>{


        setStudents(

            students.map(student=>

                student.id===id

                ?

                {...student,status}

                :

                student

            )

        );


    };



    // Mark all present

    const markAllPresent=()=>{


        setStudents(

            students.map(student=>(

                {
                    ...student,
                    status:"Present"
                }

            ))

        );


    };



    // Count

    const presentCount = students.filter(

        student=>student.status==="Present"

    ).length;



    const absentCount = students.filter(

        student=>student.status==="Absent"

    ).length;




    return(

        <div className="mark-attendance-page">


            {/* Header */}

            <div className="attendance-header">


                <div>

                    <span className="attendance-title">
                        FACULTY PORTAL
                    </span>


                    <h2>
                        Mark Attendance
                    </h2>

                </div>



                <div className="attendance-info">

                    <h3>
                        BCA - Data Structures
                    </h3>

                    <p>
                        Semester 3 | Section A
                    </p>

                </div>


            </div>




            {/* Summary */}


            <div className="stats">


                <div className="card">

                    <p>TOTAL STUDENTS</p>

                    <h2>
                        {students.length}
                    </h2>

                </div>



                <div className="card green">

                    <p>PRESENT</p>

                    <h2>
                        {presentCount}
                    </h2>

                </div>



                <div className="card red">

                    <p>ABSENT</p>

                    <h2>
                        {absentCount}
                    </h2>

                </div>



                <div className="card blue">

                    <p>ATTENDANCE %</p>

                    <h2>
                        {
                            Math.round(
                                (presentCount/students.length)*100
                            )
                        }%
                    </h2>

                </div>


            </div>






            {/* Student Header */}


            <div className="roll-header">


                <h3>
                    Student List
                </h3>


                <button 
                className="mark-all"
                onClick={markAllPresent}
                >

                    Mark All Present

                </button>


            </div>





            {/* Students */}


            <div className="student-list">


            {

                students.map(student=>(


                    <div 
                    className="student-row"
                    key={student.id}
                    >



                        <div className="student-info">


                            <span className="roll">

                                {student.roll}

                            </span>



                            <span className="student-name">

                                {student.name}

                            </span>



                        </div>






                        <div className="attendance-btns">


                            <button

                            className={
                                `status-btn present 
                                ${student.status==="Present"?"active":""}`
                            }

                            onClick={()=>changeStatus(
                                student.id,
                                "Present"
                            )}

                            >

                                Present

                            </button>




                            <button

                            className={
                                `status-btn absent 
                                ${student.status==="Absent"?"active":""}`
                            }


                            onClick={()=>changeStatus(
                                student.id,
                                "Absent"
                            )}

                            >

                                Absent

                            </button>



                        </div>



                    </div>


                ))

            }


            </div>





            {/* Save */}


            <div className="save-section">


                <button className="save-btn">

                    Save Attendance

                </button>


            </div>



        </div>


    )

}


export default MarkAttendance;
