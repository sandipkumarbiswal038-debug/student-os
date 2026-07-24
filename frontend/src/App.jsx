import { BrowserRouter, Routes, Route } from "react-router-dom";

// Role Selection 
import RoleSelection from "./pages/RoleSelection";

// Faculty Pages
import FacultyLogin from "./pages/FacultyLogin";
import FacultyAttendance from "./pages/FacultyAttendance";
import MarkAttendance from "./pages/MarkAttendance";


// Student Pages
import StudentLogin from "./pages/StudentLogin";
import StudentAttendance from "./pages/StudentAttendance"; 
import SubjectDetails from "./pages/SubjectDetails";
import FacultyDashboard from "./pages/FacultyDashboard";


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
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />

        <Route
          path="/attendance"
          element={<FacultyAttendance />}
      />


        <Route
          path="/mark-attendance"
          element={<MarkAttendance />}
      />
       

      </Routes>

    </BrowserRouter>

  );

}

export default App;
