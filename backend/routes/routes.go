package routes

import (
	"library-management/backend/controllers"
	"library-management/backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	// Admin routes
	router.POST("/create-library", controllers.CreateLibrary)
	router.POST("/create-user", controllers.CreateUser)
	admin := router.Group("/admin")
	admin.Use(middleware.AuthMiddleware("admin"))
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
	reader.Use(middleware.AuthMiddleware("reader"))
	{
		reader.GET("/search-book", controllers.SearchBook)
		reader.POST("/raise-issue-request", controllers.RaiseIssueRequest)
	}
}
