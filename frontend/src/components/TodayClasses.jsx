import React, { useEffect, useState } from "react";
import "../styles/TodayClasses.css";

import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { classApi } from "../services/classApi";
import { attendanceApi } from "../services/attendanceApi";


export default function TodayClasses({ onSelectClass, onManualAttendance }) {


  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const loadClasses = async () => {


      try {


          const [response, attendancePayload] = await Promise.all([
            classApi.listToday(),
            attendanceApi.history(),
          ]);
          const attendanceRecords = Array.isArray(attendancePayload)
            ? attendancePayload
            : attendancePayload?.results || attendancePayload?.data || [];
          const submittedSessionIds = new Set(attendanceRecords
            .map((record) => record.class_session?.id ?? record.class_session_id ?? record.class_session?.pk ?? record.class_session)
            .filter((id) => id !== undefined && id !== null)
            .map(String));


        console.log("CLASS API RESPONSE:", response);



        const formattedClasses = response.map((item) => ({


          id: item.id,


          course: item.course_name || item.course,


          semester: item.semester,


          section: item.section,


          subject:item.subject_name || item.subject,


          date: item.date,


          time: item.start_time,


          endTime: item.end_time,


          status: "Pending",

          submitted: submittedSessionIds.has(String(item.id)),


        }));



        setClasses(formattedClasses);



      }
      catch(error){


        console.error(
          "Class API Error:",
          error
        );


      }
      finally{


        setLoading(false);


      }


    };



    loadClasses();


  }, []);





  return (


    <div className="today-page">


      <div className="today-header">


        <h2>
          Today's Classes
        </h2>



        <button className="today-link" type="button" onClick={onManualAttendance}>

          Select Manually
          <FaArrowRight />

        </button>



      </div>





      <div className="class-container">



        {
          loading ?


          (

            <h3>
              Loading classes...
            </h3>

          )


          :


          classes.length === 0 ?


          (

            <h3>
              No classes found.
            </h3>

          )


          :



          classes.map((item)=>(



            <div
              className="class-row"
              key={item.id}
            >




              <div className="class-time">

                {item.time}

              </div>





              <div className="class-info">


                <div className="title-row">


                  <h3>

                    {item.subject}

                  </h3>



                  <span className="section">

                    SEC {item.section}

                  </span>



                </div>




                <p>

                  {item.course} • Semester {item.semester}

                </p>



              </div>







              <div className="status">


                <span className={item.submitted ? "completed" : "pending"}>

                  <FaClock />

                  {item.submitted ? "Already Submitted" : "Pending"}

                </span>


              </div>







              <div className="action">


                <button

                  className={item.submitted ? "disable-btn" : "mark-btn"}

                  disabled={item.submitted}

                  onClick={()=>
                    onSelectClass(item)
                  }

                >

                  {item.submitted ? "Submitted" : "Mark Attendance"}


                </button>



              </div>






            </div>



          ))



        }



      </div>


    </div>


  );

}
