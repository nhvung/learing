package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func connectDB() *gorm.DB {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "host=localhost user=admin password=secret dbname=mydb port=5432 sslmode=disable"
	}
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	return db
}

func main() {
	db := connectDB()

	// AutoMigrate creates/updates the users table to match the User model
	if err := db.AutoMigrate(&User{}); err != nil {
		log.Fatalf("auto-migrate failed: %v", err)
	}
	log.Println("database migrated")

	repo := NewUserRepository(db)
	handler := NewUserHandler(repo)

	r := gin.Default()

	api := r.Group("/api")
	users := api.Group("/users")
	{
		users.GET("", handler.GetAll)
		users.GET("/:id", handler.GetByID)
		users.POST("", handler.Create)
		users.PUT("/:id", handler.Update)
		users.DELETE("/:id", handler.Delete)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Server running at http://localhost:%s\n", port)
	fmt.Println("Try: curl -X POST http://localhost:8080/api/users -H 'Content-Type: application/json' -d '{\"name\":\"Alice\",\"email\":\"alice@example.com\"}'")
	r.Run(":" + port)
}
