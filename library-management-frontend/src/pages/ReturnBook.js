import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/return.css"; 

const ReturnBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const email = localStorage.getItem("email"); 
      try {
        const response = await axios.get("http://localhost:8080/reader/borrowed-books", {
          headers: {
            Authorization: `Bearer ${email}`, 
          },
        });
        setBorrowedBooks(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.error || "Failed to fetch borrowed books. Try again."
        );
      }
    };

    fetchBorrowedBooks();
  }, []);

  const handleReturnBook = async (issueID) => {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        `http://localhost:8080/reader/return-book/${issueID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${email}`,
          },
        }
      );
      setMessage(response.data.message);
      setBorrowedBooks(borrowedBooks.filter((book) => book.IssueID !== issueID)); 
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to return the book. Try again."
      );
    }
  };

  return (
    <div className="return-container">
      <h1>Return Book</h1>
      {message && <p className="message">{message}</p>}
      <div className="borrowed-books-list">
        {borrowedBooks.length > 0 ? (
          <table className="borrowed-books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Expected Return Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.IssueID}>
                  <td>{book.Title}</td>
                  <td>{book.Authors}</td>
                  <td>{book.IssueDate}</td>
                  <td>{book.ExpectedReturnDate}</td>
                  <td>
                    <button
                      className="return-button"
                      onClick={() => handleReturnBook(book.IssueID)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No borrowed books found</p>
        )}
      </div>
    </div>
  );
};

export default ReturnBook;