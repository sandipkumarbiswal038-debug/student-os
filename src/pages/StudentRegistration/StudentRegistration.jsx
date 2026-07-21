import "./StudentRegistration.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentRegistration() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    event: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only alphabets and spaces for Student Name
    if (name === "name") {
      const onlyLetters = value.replace(/[^A-Za-z ]/g, "");
      setStudent({
        ...student,
        name: onlyLetters,
      });
      return;
    }

    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Phone number: only digits, max 10
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setStudent({
        ...student,
        phone: value,
      });
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Student Name validation
  if (!/^[A-Za-z ]+$/.test(student.name)) {
    alert("Student Name should contain only alphabets.");
    return;
  }

  // Phone validation
  if (student.phone.length !== 10) {
    alert("Phone Number must contain exactly 10 digits.");
    return;
  }

  // Password length validation
  if (student.password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // Confirm password validation
  if (student.password !== student.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  alert("Registration Successful!");

  // Go to Event Details page
  navigate("/event-details/1");
};
  return (
    <div className="registration-container">

      <h1>Student Registration</h1>

      <p>Register for your preferred college event.</p>

      <form className="registration-form" onSubmit={handleSubmit}>

        <label>Student Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter 10-digit phone number"
          value={student.phone}
          onChange={handlePhoneChange}
          maxLength={10}
          required
        />

        <label>Department</label>
        <input
          type="text"
          name="department"
          placeholder="Enter your department"
          value={student.department}
          onChange={handleChange}
          required
        />

        <label>Year</label>
        <select
          name="year"
          value={student.year}
          onChange={handleChange}
          required
        >
          <option value="">Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <label>Select Event</label>
        <select
          name="event"
          value={student.event}
          onChange={handleChange}
          required
        >
          <option value="">Choose Event</option>
          <option>Hackathon 2026</option>
          <option>AI Workshop</option>
          <option>Sports Meet</option>
        </select>

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Minimum 8 characters"
          value={student.password}
          onChange={handleChange}
          minLength={8}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={student.confirmPassword}
          onChange={handleChange}
          minLength={8}
          required
        />

        <button
          type="submit"
          className="register-btn"
        >
          Register Now
        </button>

      </form>

    </div>
  );
}

export default StudentRegistration;