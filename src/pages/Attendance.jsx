import { useEffect, useState } from "react";
import api from "../api/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get("/api/attendance/");
        console.log("Attendance:", response.data);
        setAttendance(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Attendance Page</h1>

      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        attendance.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
}

export default Attendance;