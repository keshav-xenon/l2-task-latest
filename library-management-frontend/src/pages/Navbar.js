import React from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ brand, links }) => {
  const location = useLocation(); // Get the current path to highlight the active link
  const navigate = useNavigate();
const handleLogout = () => {
    // Clear user session (e.g., localStorage)
    localStorage.clear();
    // Redirect to the login page
    navigate("/");
  };
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        {brand}
      </Link>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;