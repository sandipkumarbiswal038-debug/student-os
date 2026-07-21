import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-title">
        <h2>NIBA EventHub</h2>
      </div>

      <nav className="navbar-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/create-event">Create Event</NavLink>
        <NavLink to="/my-events">My Events</NavLink>
        <NavLink to="/student-registration">Register</NavLink>
        <NavLink to="/event-signups">Signups</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
      </nav>

      <div className="navbar-right">

        <div className="profile">
        </div>

      </div>

    </header>
  );
}

export default Navbar;