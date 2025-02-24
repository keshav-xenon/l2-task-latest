package controllers

import (
	"library-management/backend/database"
	"library-management/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// SearchBook allows readers to search for books
func SearchBook(c *gin.Context) {
	title := c.Query("title")
	author := c.Query("author")
	publisher := c.Query("publisher")

	var books []models.BookInventory
	query := database.DB

	if title != "" {
		query = query.Where("title LIKE ?", "%"+title+"%")
	}
	if author != "" {
		query = query.Where("authors LIKE ?", "%"+author+"%")
	}
	if publisher != "" {
		query = query.Where("publisher LIKE ?", "%"+publisher+"%")
	}

	if err := query.Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search books"})
		return
	}

	c.JSON(http.StatusOK, books)
}

// RaiseIssueRequest allows readers to raise an issue request for a book
func RaiseIssueRequest(c *gin.Context) {
	var request models.RequestEvent
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the book is available
	var book models.BookInventory
	if err := database.DB.Where("isbn = ?", request.BookID).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	if book.AvailableCopies <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Book not available"})
		return
	}

	// Create the issue request
	if err := database.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to raise issue request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Issue request raised successfully!"})
}
