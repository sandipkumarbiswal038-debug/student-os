import "./Profile.css";
import profile from "../assets/profile pic.png";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <img
          src={profile}
          alt="Profile"
          className="profile-photo"
        />

        <h2>Name</h2>

        <p>Stream</p>

        <button>Edit Profile</button>

      </div>

      <div className="profile-details">

        <h2>Student Information</h2>

        <div className="info-box">

          <div className="info-item">
            <FaGraduationCap />
            <div>
              <h4>Registration Number</h4>
            </div>
          </div>

          <div className="info-item">
            <FaGraduationCap />
            <div>
              <h4>Semester</h4>
              
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
           
            </div>
          </div>

          <div className="info-item">
            <FaPhone />
            <div>
              <h4>Contact Number</h4>
              
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt />
            <div>
              <h4>Address</h4>
           
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;