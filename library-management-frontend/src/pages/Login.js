import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !role) {
      setError("Please fill in all fields.");
      return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "reader") {
      navigate("/reader");
    } else {
      setError("Invalid role. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/download (1).png" alt="Library Logo" className="logo-image" />
        </div>
        <h1 className="login-title">Welcome to Library Management</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
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
              <label htmlFor="role">Role</label>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;