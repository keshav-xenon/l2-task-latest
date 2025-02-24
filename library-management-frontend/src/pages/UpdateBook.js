import axios from "axios";
import React, { useState } from "react";
import "../styles/form.css";

const UpdateBook = () => {
  const [isbn, setIsbn] = useState("");
  const [bookDetails, setBookDetails] = useState({
    title: "",
    authors: "",
    publisher: "",
    version: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/update-book/${isbn}`,
        bookDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("email")}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to update the book. Try again."
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Update Book</h1>
      <form onSubmit={handleUpdateBook}>
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
            name="title"
            value={bookDetails.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Authors:</label>
          <input
            type="text"
            name="authors"
            value={bookDetails.authors}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Publisher:</label>
          <input
            type="text"
            name="publisher"
            value={bookDetails.publisher}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Version:</label>
          <input
            type="text"
            name="version"
            value={bookDetails.version}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="form-button">
          Update Book
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpdateBook;
