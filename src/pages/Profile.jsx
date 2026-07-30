import { useState } from "react";
import "./Profile.css";
import profile from "../assets/profile pic.png";
import API from "../api/api";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaIdCard,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";

const emptyStudent = {
  name: "Student",
  registration_no: "",
  college_email: "",
  course: "",
  semester: "",
  phone: "",
  address: "",
};

function getLoggedInStudent() {
  try {
    return { ...emptyStudent, ...JSON.parse(localStorage.getItem("user") || "{}") };
  } catch {
    return emptyStudent;
  }
}

function Profile() {
  const [student, setStudent] = useState(getLoggedInStudent);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fields = [
    { key: "registration_no", label: "Registration Number", icon: FaIdCard },
    { key: "course", label: "Course", icon: FaBook },
    { key: "semester", label: "Semester", icon: FaGraduationCap, format: (value) => value && `Semester ${value}` },
    { key: "college_email", label: "Email", icon: FaEnvelope, type: "email" },
    { key: "phone", label: "Contact Number", icon: FaPhone, type: "tel" },
    { key: "address", label: "Address", icon: FaMapMarkerAlt },
  ];

  const updateStudent = (key, value) => setStudent((current) => ({ ...current, [key]: value }));

  const saveProfile = async () => {
    if (!student.user_id) {
      setMessage("Please log in again before updating your profile.");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      const { data } = await API.patch(`/api/users/${student.user_id}/profile`, student);
      const updatedStudent = { ...student, ...data };
      setStudent(updatedStudent);
      localStorage.setItem("user", JSON.stringify(updatedStudent));
      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Unable to update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={profile} alt="Profile" className="profile-photo" />

        {editing ? (
          <input
            className="profile-name-input"
            aria-label="Student name"
            value={student.name}
            onChange={(event) => updateStudent("name", event.target.value)}
          />
        ) : <h2>{student.name || "Student"}</h2>}

        <p>{student.course ? `${student.course} Student` : "Student"}</p>

        {editing ? (
          <div className="profile-actions">
            <button className="edit-btn" onClick={saveProfile} disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </button>
            <button className="cancel-edit-btn" onClick={() => { setStudent(getLoggedInStudent()); setEditing(false); }}>
              Cancel
            </button>
          </div>
        ) : <button className="edit-btn" onClick={() => { setMessage(""); setEditing(true); }}>Edit Profile</button>}

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      <div className="profile-details">
        <h2>Student Information</h2>
        {message && <p className="profile-message">{message}</p>}

        <div className="info-grid">
          {fields.map(({ key, label, icon: Icon, type = "text", format }) => (
            <div className="info-item" key={key}>
              <Icon />
              <div>
                <h4>{label}</h4>
                {editing ? (
                  <input
                    type={type}
                    value={student[key] || ""}
                    onChange={(event) => updateStudent(key, event.target.value)}
                    aria-label={label}
                  />
                ) : <p>{format ? format(student[key]) || "Not provided" : student[key] || "Not provided"}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
