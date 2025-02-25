import axios from "axios";
import React, { useState } from "react";
import "../styles/form.css"; // Add custom styles for the form

const AddBook = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [message, setMessage] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    const bookData = {
      ISBN: isbn,
      Title: title,
      Authors: authors,
      Publisher: publisher,
      Version: version,
      TotalCopies: parseInt(totalCopies),
      AvailableCopies: parseInt(totalCopies),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/add-book",
        bookData,
        {
          headers: {
            Authorization: `Bearer ${email}`, 
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to add the book. Try again."
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Add a New Book</h1>
      <form onSubmit={handleAddBook}>
        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Authors:</label>
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
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
        <div className="form-group">
          <label>Version:</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Total Copies:</label>
          <input
            type="number"
            value={totalCopies}
            onChange={(e) => setTotalCopies(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit" className="form-button">
          Add Book
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddBook;
