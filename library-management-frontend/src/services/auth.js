func AuthMiddleware(requiredRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		// Extract email from Bearer token
		bearerToken := strings.Split(authHeader, "Bearer ")
		if len(bearerToken) != 2 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization format"})
			c.Abort()
			return
		}

		email := strings.TrimSpace(bearerToken[1])
		var user models.User

		// Log the email being checked
		c.Logger().Infof("Checking user with email: %s", email)

		if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user"})
			c.Abort()
			return
		}

		// Log the user's role
		c.Logger().Infof("User role: %s, Required role: %s", user.Role, requiredRole)

		if requiredRole != "" && strings.ToLower(user.Role) != strings.ToLower(requiredRole) {
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}