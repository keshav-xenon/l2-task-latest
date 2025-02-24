package routes

import (
	"library-management/backend/controllers"
	"library-management/backend/middleware"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine) {
	// Admin routes
	// Add this line in the SetupRoutes function
	router.POST("/create-library", controllers.CreateLibrary)
	router.POST("/create-user", controllers.CreateUser)
	admin := router.Group("/admin")
	admin.Use(middleware.AuthMiddleware("admin")) // Only Admins can access these routes
	{
		admin.POST("/add-book", controllers.AddBook)
		admin.DELETE("/remove-book/:isbn", controllers.RemoveBook)
		admin.PUT("/update-book/:isbn", controllers.UpdateBook)
		admin.GET("/list-issue-requests", controllers.ListIssueRequests)
		admin.POST("/approve-request/:reqID", controllers.ApproveRequest)
		admin.POST("/reject-request/:reqID", controllers.RejectRequest)
	}

	// Reader routes
	reader := router.Group("/reader")
	reader.Use(middleware.AuthMiddleware("reader")) // Only Readers can access these routes
	{
		reader.GET("/search-book", controllers.SearchBook)
		reader.POST("/raise-issue-request", controllers.RaiseIssueRequest)
	}
}

func AddMigrationRoutes(router *gin.RouterGroup, db *gorm.DB) {
	router.POST("/migrate/add-password", func(c *gin.Context) {
		// SQL command to add password column
		sql := "ALTER TABLE users ADD password text NOT NULL DEFAULT 'temporary_password'"

		err := db.Exec(sql).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Failed to add password column",
				"error":   err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "Password column added successfully",
		})
	})
}
