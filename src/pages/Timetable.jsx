import { useEffect, useState } from "react";
import api from "../api/api";

function Timetable() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await api.get("/api/class-sessions/");
        console.log("Timetable:", response.data);
        setClasses(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Timetable Page</h1>

      {classes.length === 0 ? (
        <p>No class sessions available.</p>
      ) : (
        classes.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
}

export default Timetable;