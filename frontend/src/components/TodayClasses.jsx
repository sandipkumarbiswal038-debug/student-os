import React, { useEffect, useState } from "react";
import "../styles/TodayClasses.css";

import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { classApi } from "../services/classApi";


export default function TodayClasses({ onSelectClass }) {


  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const loadClasses = async () => {


      try {


        const response = await classApi.list();


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



        <button className="today-link">

          View Schedule 
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


                <span className="pending">

                  <FaClock />

                  Pending

                </span>


              </div>







              <div className="action">


                <button

                  className="mark-btn"

                  onClick={()=>
                    onSelectClass(item)
                  }

                >

                  Mark Attendance


                </button>



              </div>






            </div>



          ))



        }



      </div>


    </div>


  );

}
