import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

import "./App.css";
import "./styles/global.css";

import ScrollToTop from "./ScrollToTop";

// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DashboardCards from "./components/DashboardCards";
import DashboardBottom from "./components/DashboardBottom";

// Pages
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";
import StudentAttendance from "./pages/StudentAttendance";
import SubjectDetails from "./pages/SubjectDetails";
import Timetable from "./pages/Timetable";
import NotesAndAssignments from "./pages/NotesAndAssignments";
import Notifications from "./pages/Notifications";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EventDetails from "./pages/EventDetails";
import StudentRegistration from "./pages/StudentRegistration";


function DashboardHome() {
  return (
    <>
      <Header />
      <Hero />
      <DashboardCards />
      <DashboardBottom />
    </>
  );
}


function DashboardLayout() {

  const handleRefresh = () =>
    new Promise((resolve) => {
      window.location.reload();
      resolve();
    });


  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <ScrollToTop />

        <div className="rings"></div>
        <div className="dots"></div>
        <div className="wave"></div>
        <div className="blob"></div>


        <PullToRefresh onRefresh={handleRefresh}>
          <Outlet />
        </PullToRefresh>

      </main>

    </div>
  );
}



function App() {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);


  return (

    <Routes>


      {/* Public Pages */}

      <Route 
        path="/" 
        element={<LandingPage />} 
      />


      <Route 
        path="/student-login" 
        element={<StudentLogin />} 
      />

      <Route
        path="/faculty-login"
        element={<FacultyLogin />}
      />



      {/* Dashboard Pages */}

      <Route element={<DashboardLayout />}>


        <Route
          path="/dashboard"
          element={<DashboardHome />}
        />


        <Route
          path="/attendance"
          element={<StudentAttendance />}
        />


        <Route
          path="/subject-details"
          element={<SubjectDetails />}
        />


        <Route
          path="/timetable"
          element={<Timetable />}
        />


        <Route
          path="/notes-and-assignments"
          element={<NotesAndAssignments />}
        />


        <Route
          path="/notifications"
          element={<Notifications />}
        />


        {/* Events */}

        <Route
          path="/events"
          element={<Home />}
        />


        <Route
          path="/event-details/:id"
          element={<EventDetails />}
        />


        <Route
          path="/student-registration"
          element={<StudentRegistration />}
        />


        {/* Profile */}

        <Route
          path="/profile"
          element={<Profile />}
        />


      </Route>


    </Routes>

  );
}


export default App;
