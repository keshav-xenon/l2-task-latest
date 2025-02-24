import React from "react";
import Navbar from "./Navbar";

const AdminNavbar = () => {
  const adminLinks = [
    { path: "/admin/add-book", label: "Add Book" },
    { path: "/admin/remove-book", label: "Remove Book" },
    { path: "/admin/update-book", label: "Update Book" },
    { path: "/admin/list-issue-requests", label: "List Issue Requests" },
  ];

  return <Navbar brand="Library Admin" links={adminLinks} />;
};

export default AdminNavbar;