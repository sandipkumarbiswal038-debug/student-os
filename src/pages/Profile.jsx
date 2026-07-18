import "./Profile.css";
import profile from "../assets/profile pic.png";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaIdCard,
  FaBook,
  FaSignOutAlt
} from "react-icons/fa";

function Profile() {

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="profile-page">

      {/* Left Profile Card */}
      <div className="profile-card">

        <img
          src={profile}
          alt="Profile"
          className="profile-photo"
        />

        <h2>Name</h2>

        <p>MCA Student</p>

        <button className="edit-btn">
          Edit Profile
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

      {/* Right Information Card */}
      <div className="profile-details">

        <h2>Student Information</h2>

        <div className="info-grid">

          <div className="info-item">
            <FaIdCard />
            <div>
              <h4>Registration Number</h4>
              <p>---</p>
            </div>
          </div>

          <div className="info-item">
            <FaBook />
            <div>
              <h4>Course</h4>
              <p>---</p>
            </div>
          </div>

          <div className="info-item">
            <FaGraduationCap />
            <div>
              <h4>Semester</h4>
              <p>---</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>---</p>
            </div>
          </div>

          <div className="info-item">
            <FaPhone />
            <div>
              <h4>Contact Number</h4>
              <p>---</p>
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt />
            <div>
              <h4>Address</h4>
              <p>---</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;