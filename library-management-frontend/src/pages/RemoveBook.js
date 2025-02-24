import axios from "axios";
import React, { useState } from "react";
import "../styles/form.css";

const RemoveBook = () => {
  const [isbn, setIsbn] = useState("");
  const [message, setMessage] = useState("");

  const handleRemoveBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/remove-book/${isbn}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("email")}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to remove the book. Try again."
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Remove Book</h1>
      <form onSubmit={handleRemoveBook}>
        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Remove Book
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RemoveBook;
