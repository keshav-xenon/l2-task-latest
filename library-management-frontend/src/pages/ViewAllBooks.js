import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/books.css"; // Add custom styles for the books page

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all books from the backend
    const fetchBooks = async () => {
      const email = localStorage.getItem("email"); // Reader email from local storage
      try {
        const response = await axios.get("http://localhost:8080/reader/search-book", {
          headers: {
            Authorization: `Bearer ${email}`, // Pass email as Bearer token
          },
        });
        setBooks(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.error || "Failed to fetch books. Try again."
        );
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books-container">
      <h1>All Books</h1>
      {message && <p className="message">{message}</p>}
      <div className="books-list">
        {books.length > 0 ? (
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Available Copies</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.ISBN}>
                  <td>{book.Title}</td>
                  <td>{book.Authors}</td>
                  <td>{book.Publisher}</td>
                  <td>{book.AvailableCopies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllBooks;