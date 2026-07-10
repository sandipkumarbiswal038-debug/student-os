import "./Attendance.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Attendance() {

  const attendanceData = {

    DBMS: { total: 60, attended: 55 },

    Python: { total: 60, attended: 49 },

    Java: { total: 60, attended: 27 },

    "Operating System": {
      total: 60,
      attended: 43,
    },

    "Software Engineering": {
      total: 60,
      attended: 58,
    },

    "Computer Network": {
      total: 60,
      attended: 35,
    },

  };

  const [subject, setSubject] = useState("DBMS");

  const total = attendanceData[subject].total;
  const attended = attendanceData[subject].attended;

  const percentage = Math.round(
    (attended / total) * 100
  );

  let color = "#22C55E";

  if (percentage < 50) {

    color = "#EF4444";

  } else if (percentage < 75) {

    color = "#F59E0B";

  }

  const data = {

    labels: [
      "Attended",
      "Remaining",
    ],

    datasets: [

      {
        data: [
          attended,
          total - attended,
        ],

        backgroundColor: [
          color,
          "#E5E7EB",
        ],

        borderWidth: 2,

      },

    ],

  };

  return (

    <div className="attendance-page">

      <div className="attendance-card">

        <h1>📊 Subject Attendance</h1>

        <select
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        >

          {Object.keys(attendanceData).map(
            (sub) => (

              <option key={sub}>
                {sub}
              </option>

            )
          )}

        </select>

        <div className="chart-box">

          <Pie data={data} />

        </div>

        <div className="details">

          <p>
            <strong>Subject :</strong> {subject}
          </p>

          <p>
            <strong>Attendance :</strong> {percentage}%
          </p>

          <p>
            <strong>Total Classes :</strong> {total}
          </p>

          <p>
            <strong>Classes Attended :</strong> {attended}
          </p>

        </div>

      </div>

    </div>

  );
}

export default Attendance;