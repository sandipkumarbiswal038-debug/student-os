import "../styles/AttendanceReport.css";

function AttendanceReport() {

  const students = [
    {
      regd: "MCA001",
      name: "Rahul",
      present: 18,
      absent: 2,
      notHeld: 0
    },
    {
      regd: "MCA002",
      name: "Priya",
      present: 20,
      absent: 0,
      notHeld: 2
    },
    {
      regd: "MCA003",
      name: "Aman",
      present: 15,
      absent: 5,
      notHeld: 0
    }
  ];


  const calculatePercentage = (present, absent) => {

    const total = present + absent;

    if(total === 0){
      return 0;
    }

    return ((present / total) * 100).toFixed(2);
  };


  return (

    <div className="report-container">

      <div className="report-card">

        <h2>Attendance Report</h2>


        <div className="summary">

          <div>
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>

          <div>
            <h3>Present</h3>
            <p>53</p>
          </div>

          <div>
            <h3>Absent</h3>
            <p>7</p>
          </div>

          <div>
            <h3>Not Held</h3>
            <p>2</p>
          </div>

        </div>


        <table>

          <thead>

            <tr>
              <th>Regd No</th>
              <th>Name</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Not Held</th>
              <th>Percentage</th>
            </tr>

          </thead>


          <tbody>

          {
            students.map((student,index)=>(

              <tr key={index}>

                <td>{student.regd}</td>

                <td>{student.name}</td>

                <td>{student.present}</td>

                <td>{student.absent}</td>

                <td>{student.notHeld}</td>

                <td>
                  {calculatePercentage(
                    student.present,
                    student.absent
                  )}%
                </td>

              </tr>

            ))
          }

          </tbody>

        </table>


      </div>

    </div>

  );

}

export default AttendanceReport;