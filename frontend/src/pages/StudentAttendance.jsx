import "../styles/StudentAttendance.css";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  FaUserGraduate,
  FaIdCard,
  FaGraduationCap,
} from "react-icons/fa";

import { MdClass } from "react-icons/md";


function StudentAttendance() {


  const navigate = useNavigate();



  const subjects = [

    {
      subject:"Java",
      total:40,
      attended:36,
      percentage:90
    },

    {
      subject:"Python",
      total:38,
      attended:34,
      percentage:89
    },

    {
      subject:"Operating System",
      total:42,
      attended:27,
      percentage:64
    }

  ];



  return (

    <div className="student-layout">


      <Sidebar />


      <div className="student-main">


        <Header />



        <div className="student-container">



          <h1 className="student-title">
            Student Attendance
          </h1>




          {/* STUDENT INFORMATION */}


          <div className="student-info-card">



            <div className="student-info-item">

              <FaUserGraduate className="student-info-icon"/>

              <h4>Name</h4>

              <p>
                Sushree Saswati Mishra
              </p>

            </div>





            <div className="student-info-item">

              <FaIdCard className="student-info-icon"/>

              <h4>Regd No.</h4>

              <p>
                2505280075
              </p>

            </div>





            <div className="student-info-item">

              <FaGraduationCap className="student-info-icon"/>

              <h4>Course</h4>

              <p>
                MCA
              </p>

            </div>





            <div className="student-info-item">

              <FaGraduationCap className="student-info-icon"/>

              <h4>Semester</h4>

              <p>
                3rd Semester
              </p>

            </div>





            <div className="student-info-item">

              <MdClass className="student-info-icon"/>

              <h4>Section</h4>

              <p>
                A
              </p>

            </div>



          </div>






          {/* ATTENDANCE TABLE */}



          <div className="student-table-card">


            <h2>
              Subject Wise Attendance
            </h2>



            <div className="student-table-wrapper">


            <table className="student-table">


              <thead>

                <tr>

                  <th>
                    Subject
                  </th>

                  <th>
                    Total Classes
                  </th>

                  <th>
                    Attended
                  </th>

                  <th>
                    Percentage
                  </th>

                  <th>
                    Action
                  </th>


                </tr>

              </thead>




              <tbody>


              {

                subjects.map((item,index)=>(


                  <tr key={index}>


                    <td>
                      {item.subject}
                    </td>



                    <td>
                      {item.total}
                    </td>



                    <td>
                      {item.attended}
                    </td>




                    <td>


                      <div className="student-progress-box">


                        <div className="student-progress">


                          <div

                          className={
                            item.percentage < 75
                            ?
                            "student-progress-fill low"
                            :
                            "student-progress-fill"
                          }


                          style={{
                            width:`${item.percentage}%`
                          }}


                          >


                          </div>


                        </div>


                        <span>
                          {item.percentage}%
                        </span>


                      </div>


                    </td>




                    <td>


                    <button

                    className="student-view-btn"


                    onClick={()=>


                      navigate(
                        "/student/subject-details",
                        {
                          state:{
                            subject:item.subject,
                            held:item.total,
                            attended:item.attended,
                            percentage:item.percentage
                          }
                        }
                      )


                    }


                    >

                      View Details

                    </button>



                    </td>




                  </tr>


                ))


              }



              </tbody>



            </table>


            </div>


          </div>



        </div>



      </div>



    </div>


  );


}



export default StudentAttendance;