import { useState } from "react";
import { classroll } from "./data/mockData";
import "./App.css";

function App() {
  const [students, setStudents] = useState(classroll);

  const markPresent = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id
        ? { ...student, status: "Present" }
        : student
    );

    setStudents(updatedStudents);
  };

  return (
    <div>
      <h1>Student Attendance</h1>

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>Roll No: {student.rollno}</p>
          <p>Status: {student.status}</p>

          <button onClick={() => markPresent(student.id)}>
            Mark Present
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;