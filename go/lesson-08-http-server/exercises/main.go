package main

import (
	"fmt"
	"net/http"
	"strconv"
	"sync"

	"github.com/gin-gonic/gin"
)

// Exercise: Extend the User API from the lesson with a Posts sub-resource.
//
// Required endpoints:
//   GET    /api/users/:id/posts         — list posts for a user
//   POST   /api/users/:id/posts         — create a post for a user
//   DELETE /api/users/:id/posts/:postId — delete a specific post
//
// A Post has: ID int, UserID int, Title string (required), Body string
//
// Also add a query parameter to GET /api/users/:id/posts:
//   ?limit=N — return at most N posts (default: all)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name" binding:"required"`
	Email string `json:"email" binding:"required"`
}

type Post struct {
	ID     int    `json:"id"`
	UserID int    `json:"user_id"`
	Title  string `json:"title" binding:"required"`
	Body   string `json:"body"`
}

type Store struct {
	mu          sync.RWMutex
	users       map[int]User
	posts       map[int][]Post
	userCounter int
	postCounter int
}

func NewStore() *Store {
	s := &Store{
		users: map[int]User{1: {ID: 1, Name: "Alice", Email: "alice@example.com"}},
		posts: map[int][]Post{},
		userCounter: 1,
	}
	return s
}

// TODO: implement store methods:
//   GetPosts(userID int, limit int) ([]Post, bool)
//   CreatePost(userID int, p Post) (Post, bool)
//   DeletePost(userID, postID int) bool

// TODO: implement handler methods:
//   listPosts(c *gin.Context)
//   createPost(c *gin.Context)
//   deletePost(c *gin.Context)

func main() {
	store := NewStore()
	_ = store

	r := gin.Default()
	api := r.Group("/api")

	// Existing user routes (provided — do not modify)
	api.GET("/users", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": []User{{ID: 1, Name: "Alice", Email: "alice@example.com"}}})
	})
	api.GET("/users/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		c.JSON(http.StatusOK, gin.H{"id": id})
	})

	// TODO: register the post sub-resource routes here
	// api.GET("/users/:id/posts", ...)
	// api.POST("/users/:id/posts", ...)
	// api.DELETE("/users/:id/posts/:postId", ...)

	fmt.Println("Server running at http://localhost:8080")
	fmt.Println("Try:")
	fmt.Println("  curl -X POST http://localhost:8080/api/users/1/posts -H 'Content-Type: application/json' -d '{\"title\":\"Hello\",\"body\":\"World\"}'")
	fmt.Println("  curl http://localhost:8080/api/users/1/posts")
	r.Run(":8080")
}
