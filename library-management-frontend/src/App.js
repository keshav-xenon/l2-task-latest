import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AddBook from "./pages/AddBook";
import AdminNavbar from "./pages/AdminDashboard";
import ListIssueRequests from "./pages/ListIssueRequests";
import Login from "./pages/Login";
import RaiseIssueRequest from "./pages/RaiseIssueRequest";
import ReaderNavbar from "./pages/ReaderNavbar";
import ReaderProfile from "./pages/ReaderProfile";
import Register from "./pages/Register";
import RemoveBook from "./pages/RemoveBook";
import SearchBook from "./pages/SearchBook";
import UpdateBook from "./pages/UpdateBook";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavbar />
              <Routes>
                <Route
                  index={true}
                  element={<Navigate to={"/admin/add-book"} />}
                />
                <Route index={true} path="add-book" element={<AddBook />} />
                <Route path="remove-book" element={<RemoveBook />} />
                <Route path="update-book" element={<UpdateBook />} />
                <Route
                  path="list-issue-requests"
                  element={<ListIssueRequests />}
                />
              </Routes>
            </>
          }
        />

        {/* Reader Routes */}
        <Route
          path="/reader/*"
          element={
            <>
              <ReaderNavbar />
              <Routes>
                <Route
                  index={true}
                  element={<Navigate to={"/reader/search-book"} />}
                />
                <Route path="search-book" element={<SearchBook />} />
                <Route
                  path="raise-issue-request"
                  element={<RaiseIssueRequest />}
                />
                <Route path="profile" element={<ReaderProfile />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
