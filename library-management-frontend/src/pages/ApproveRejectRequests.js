import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/list.css"; // Add custom styles for the list page

const ApproveRejectRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all issue requests
    const fetchRequests = async () => {
      const email = localStorage.getItem("email"); // Admin email from local storage
      try {
        const response = await axios.get("http://localhost:8080/admin/list-issue-requests", {
          headers: {
            Authorization: `Bearer ${email}`, // Pass email as Bearer token
          },
        });
        setRequests(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.error || "Failed to fetch issue requests. Try again."
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
      setRequests(requests.filter((request) => request.ReqID !== reqID)); // Remove approved request
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to approve the request. Try again."
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
      setRequests(requests.filter((request) => request.ReqID !== reqID)); // Remove rejected request
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to reject the request. Try again."
      );
    }
  };

  return (
    <div className="list-container">
      <h1>Approve or Reject Issue Requests</h1>
      {message && <p className="message">{message}</p>}
      <div className="requests-list">
        {requests.length > 0 ? (
          <table className="requests-table">
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
              {requests.map((request) => (
                <tr key={request.ReqID}>
                  <td>{request.ReqID}</td>
                  <td>{request.BookID}</td>
                  <td>{request.ReaderID}</td>
                  <td>{request.RequestDate}</td>
                  <td>
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(request.ReqID)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(request.ReqID)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No issue requests found</p>
        )}
      </div>
    </div>
  );
};

export default ApproveRejectRequests;