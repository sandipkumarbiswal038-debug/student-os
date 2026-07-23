import { BrowserRouter, Routes, Route } from "react-router-dom";

// Role Selection 
import RoleSelection from "./pages/RoleSelection";

// Faculty Pages
import FacultyLogin from "./pages/FacultyLogin";
import FacultyAttendance from "./pages/FacultyAttendance";

// Student Pages
import StudentLogin from "./pages/StudentLogin";
import StudentAttendance from "./pages/StudentAttendance"; 
import SubjectDetails from "./pages/SubjectDetails";


function App() {

  return (

    <BrowserRouter>

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<RoleSelection />} />

        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/subject-details" element={<SubjectDetails />} />

        <Route path="/faculty/login" element={<FacultyLogin />} />

        <Route
          path="/attendance"
          element={<FacultyAttendance />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;