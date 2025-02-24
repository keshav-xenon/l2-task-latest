import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/profile.css";

const ReaderProfile = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReaderData();
  }, []);

  const fetchReaderData = async () => {
    try {
      const email = localStorage.getItem("email");
      // Fetch issued books
      const issuedResponse = await api.get(`/reader/issued-books/${email}`);
      setIssuedBooks(issuedResponse.data);

      // Fetch request history
      const historyResponse = await api.get(`/reader/request-history/${email}`);
      setRequestHistory(historyResponse.data);

      setError("");
    } catch (err) {
      setError("");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      {error && <div className="error-message">{error}</div>}

      <section className="issued-books">
        <h3>Currently Issued Books</h3>
        {issuedBooks.length === 0 ? (
          <p>No books currently issued</p>
        ) : (
          <div className="books-grid">
            {issuedBooks.map((book) => (
              <div key={book.IssueID} className="book-card">
                <h4>{book.Title}</h4>
                <p>
                  Issue Date: {new Date(book.IssueDate).toLocaleDateString()}
                </p>
                <p>
                  Expected Return:{" "}
                  {new Date(book.ExpectedReturnDate).toLocaleDateString()}
                </p>
                <p className="status">Status: {book.IssueStatus}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="request-history">
        <h3>Request History</h3>
        {requestHistory.length === 0 ? (
          <p>No request history found</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Response Date</th>
              </tr>
            </thead>
            <tbody>
              {requestHistory.map((request) => (
                <tr key={request.ReqID}>
                  <td>{request.BookTitle}</td>
                  <td>{new Date(request.RequestDate).toLocaleDateString()}</td>
                  <td>{request.ApprovalDate ? "Approved" : "Pending"}</td>
                  <td>
                    {request.ApprovalDate
                      ? new Date(request.ApprovalDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ReaderProfile;
