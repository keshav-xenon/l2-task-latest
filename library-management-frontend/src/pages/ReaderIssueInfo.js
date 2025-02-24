import React, { useState } from "react";
import axios from "axios";
import "../styles/list.css"; // Reuse the list styles

const ReaderIssueInfo = () => {
  const [readerEmail, setReaderEmail] = useState("");
  const [issueInfo, setIssueInfo] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email"); // Admin email from local storage
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/reader-issue-info`,
        {
          headers: {
            Authorization: `Bearer ${email}`,
          },
          params: {
            readerEmail,
          },
        }
      );
      setIssueInfo(response.data);
      setMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to fetch issue info. Try again."
      );
      setIssueInfo([]);
    }
  };

  return (
    <div className="list-container">
      <h1>Reader Issue Info</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Reader Email:</label>
          <input
            type="email"
            value={readerEmail}
            onChange={(e) => setReaderEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Search
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="requests-list">
        {issueInfo.length > 0 ? (
          <table className="requests-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Issue Date</th>
                <th>Expected Return Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {issueInfo.map((info) => (
                <tr key={info.IssueID}>
                  <td>{info.Title}</td>
                  <td>{info.IssueDate}</td>
                  <td>{info.ExpectedReturnDate}</td>
                  <td>{info.ReturnDate || "Not Returned"}</td>
                  <td>{info.IssueStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No issue info found</p>
        )}
      </div>
    </div>
  );
};

export default ReaderIssueInfo;