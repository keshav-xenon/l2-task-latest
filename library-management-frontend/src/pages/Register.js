import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css"; 
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [role, setRole] = useState("");
  const [libID, setLibID] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !role || !libID) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/create-user", {
        name,
        email,
        contactNumber,
        role,
        libID: parseInt(libID),
      });

      if (response.status === 200) {
        setSuccess("User registered successfully!");
        setError("");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError("Failed to register user. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
      <div className="login-logo">
          <img src="/download (1).png" alt="Library Logo" className="logo-image" />
        </div>
        <h1 className="register-title">Create an Account</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="reader">Reader</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="libID">Library ID:</label>
            <input
              type="text"
              id="libID"
              value={libID}
              onChange={(e) => setLibID(e.target.value)}
              placeholder="Enter your library ID"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
