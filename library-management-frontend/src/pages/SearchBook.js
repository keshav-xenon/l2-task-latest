import React, { useState } from "react";
import axios from "axios";
import "../styles/search.css"; 

const SearchBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email"); 
    try {
      const response = await axios.get("http://localhost:8080/reader/search-book", {
        headers: {
          Authorization: `Bearer ${email}`, 
        },
        params: {
          title,
          author,
          publisher,
        },
      });
      setBooks(response.data);
      setMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to search books. Try again."
      );
      setBooks([]);
    }
  };

  return (
    <div className="search-container">
      <h1>Search Books</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Publisher:</label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="results">
        {books.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Available Copies</th>
                
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.ISBN}>
                  <td>{book.Title}</td>
                  <td>{book.Authors}</td>
                  <td>{book.Publisher}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.AvailableCopies}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default SearchBook;