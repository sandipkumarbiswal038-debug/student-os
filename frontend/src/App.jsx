import { BrowserRouter, Routes, Route } from "react-router-dom";

import FacultyLogin from "./pages/FacultyLogin";
import FacultyAttendance from "./pages/FacultyAttendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import MyClasses from "./pages/MyClasses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FacultyLogin />} />
        <Route path="/attendance" element={<FacultyAttendance />} />
        <Route
          path="/attendance-history"
          element={<AttendanceHistory />}
        />
        <Route path="/my-classes" element={<MyClasses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;