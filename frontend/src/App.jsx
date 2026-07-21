import { BrowserRouter, Routes, Route } from "react-router-dom";

import FacultyLogin from "./pages/FacultyLogin";
import FacultyAttendance from "./pages/FacultyAttendance";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<FacultyLogin />} />

        <Route
          path="/attendance"
          element={<FacultyAttendance />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;