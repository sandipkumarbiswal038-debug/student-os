import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyLogin from "./pages/FacultyLogin";
import AttendanceSheet from "./pages/AttendanceSheet";
import StudentAttendance from "./pages/StudentAttendance";
import ForgotPassword from "./pages/ForgotPassword";
import AttendanceReport from "./pages/AttendanceReport";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<FacultyLogin />} />

        <Route 
          path="/attendance" 
          element={<AttendanceSheet />} 
        />

        <Route 
          path="/students" 
          element={<StudentAttendance />} 
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
       />

        <Route 
          path="/report" 
          element={<AttendanceReport />} 
       />

      </Routes>

    </BrowserRouter>
  );
}

export default App;