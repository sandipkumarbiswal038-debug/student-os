import "./StudentRegistration.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentRegistration() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: "", email: "", phone: "", department: "", year: "" });
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setStudent((current) => ({ ...current, [name]: name === "name" ? value.replace(/[^A-Za-z ]/g, "") : value }));
  };

  const handlePhoneChange = ({ target: { value } }) => {
    setStudent((current) => ({ ...current, phone: value.replace(/\D/g, "").slice(0, 10) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[A-Za-z ]+$/.test(student.name.trim())) {
      setError("Student name should contain letters only.");
      return;
    }
    if (student.phone.length !== 10) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }
    setError("");
    navigate("/student/events");
  };

  return (
    <div className="registration-container">
      <h1>Student Registration</h1>
      <p>Register for your preferred college event.</p>
      <form className="registration-form" onSubmit={handleSubmit}>
        {error && <p className="registration-error" role="alert">{error}</p>}
        <label>Student Name</label>
        <input type="text" name="name" placeholder="Enter your name" value={student.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email" value={student.email} onChange={handleChange} required />
        <label>Phone Number</label>
        <input type="tel" name="phone" placeholder="Enter 10-digit phone number" value={student.phone} onChange={handlePhoneChange} maxLength={10} required />
        <label>Department</label>
        <input type="text" name="department" placeholder="Enter your department" value={student.department} onChange={handleChange} required />
        <label>Year</label>
        <select name="year" value={student.year} onChange={handleChange} required>
          <option value="">Select Year</option>
          <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
        </select>
        <button type="submit" className="register-btn">Register Now</button>
      </form>
    </div>
  );
}

export default StudentRegistration;