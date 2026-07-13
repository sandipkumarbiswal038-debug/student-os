import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";

import ScrollToTop from "./ScrollToTop";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DashboardCards from "./components/DashboardCards";
import DashboardBottom from "./components/DashboardBottom";

import Attendance from "./pages/Attendance";
import Timetable from "./pages/Timetable";
import NotesAndAssignments from "./pages/NotesAndAssignments";
import Notifications from "./pages/Notifications";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

import "./App.css";
import "./styles/global.css";


function Dashboard() {
  return (
    <>
      <Header />
      <Hero />
      <DashboardCards />
      <DashboardBottom />
    </>
  );
}


function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleRefresh = () => {
    return new Promise((resolve) => {
      window.location.reload();
      resolve();
    });
  };


  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <ScrollToTop />

        {/* Background Design */}
        <div className="rings"></div>
        <div className="dots"></div>
        <div className="wave"></div>
        <div className="blob"></div>


        <PullToRefresh onRefresh={handleRefresh}>

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route 
              path="/attendance" 
              element={<Attendance />} 
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

            <Route 
              path="/events" 
              element={<Events />} 
            />

            <Route 
              path="/profile" 
              element={<Profile />} 
            />

          </Routes>

        </PullToRefresh>


      </main>

    </div>
  );
}


export default App;