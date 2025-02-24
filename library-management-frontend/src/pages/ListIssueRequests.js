import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/list.css"; // Add custom styles for the list

const ListIssueRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch issue requests from the backend
    const fetchRequests = async () => {
      const email = localStorage.getItem("email"); // Admin email from local storage
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/list-issue-requests",
          {
            headers: {
              Authorization: `Bearer ${email}`, // Pass email as Bearer token
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.error || "Failed to fetch issue requests"
        );
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (reqID) => {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        `http://localhost:8080/admin/approve-request/${reqID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${email}`,
          },
        }
      );
      setMessage(response.data.message);
      setRequests(requests.filter((req) => req.ReqID !== reqID)); // Remove approved request
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to approve the request"
      );
    }
  };

  const handleReject = async (reqID) => {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        `http://localhost:8080/admin/reject-request/${reqID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${email}`,
          },
        }
      );
      setMessage(response.data.message);
      setRequests(requests.filter((req) => req.ReqID !== reqID)); // Remove rejected request
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to reject the request"
      );
    }
  };

  return (
    <div className="list-container">
      <h1>Issue Requests</h1>
      {message && <p className="message">{message}</p>}
      <table className="list-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Book ID</th>
            <th>Reader ID</th>
            <th>Request Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.ReqID}>
                <td>{req.ReqID}</td>
                <td>{req.BookID}</td>
                <td>{req.ReaderID}</td>
                <td>{req.RequestDate}</td>
                <td>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(req.ReqID)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(req.ReqID)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No issue requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListIssueRequests;