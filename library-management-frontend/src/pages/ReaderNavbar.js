import React from "react";
import Navbar from "./Navbar";

const ReaderNavbar = () => {
  const readerLinks = [
    { path: "/reader/search-book", label: "Search Book" },
    { path: "/reader/raise-issue-request", label: "Raise Issue Request" },
    { path: "/reader/profile", label: "Profile" },
  ];

  return <Navbar brand="Library Reader" links={readerLinks} />;
};

export default ReaderNavbar;