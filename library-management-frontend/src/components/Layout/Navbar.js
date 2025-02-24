import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Library Management
      </Link>
      <ul>
        <li>
          <Link to="/admin/add-book" className="active">
            Add Book
          </Link>
        </li>
        <li>
          <Link to="/admin/remove-book">Remove Book</Link>
        </li>
        <li>
          <Link to="/admin/update-book">Update Book</Link>
        </li>
        <li>
          <Link to="/admin/list-issue-requests">Issue Requests</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;