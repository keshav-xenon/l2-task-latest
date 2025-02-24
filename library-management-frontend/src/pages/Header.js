import React from "react";
import "../styles/header.css"; // Add custom styles for the header

const Header = () => {
  return (
    <header className="header">
      <img
        src="/download.png" // Path to the image in the public folder
        alt="Library Logo"
        className="header-logo"
      />
      <h1 className="header-title">Online Library Management System</h1>
    </header>
  );
};

export default Header;