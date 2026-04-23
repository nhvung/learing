package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
)

// ─── Model ────────────────────────────────────────────────────────────────────

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name" binding:"required"`
	Email string `json:"email" binding:"required,email"`
}

// ─── In-memory store ──────────────────────────────────────────────────────────

type UserStore struct {
	mu      sync.RWMutex
	users   map[int]User
	counter int
}

func NewUserStore() *UserStore {
	s := &UserStore{users: make(map[int]User)}
	// Seed data
	s.add(User{Name: "Alice", Email: "alice@example.com"})
	s.add(User{Name: "Bob", Email: "bob@example.com"})
	return s
}

func (s *UserStore) add(u User) User {
	s.counter++
	u.ID = s.counter
	s.users[u.ID] = u
	return u
}

func (s *UserStore) getAll(nameFilter string) []User {
	s.mu.RLock()
	defer s.mu.RUnlock()
	result := []User{}
	for _, u := range s.users {
		if nameFilter == "" || strings.Contains(strings.ToLower(u.Name), strings.ToLower(nameFilter)) {
			result = append(result, u)
		}
	}
	return result
}

func (s *UserStore) getByID(id int) (User, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	u, ok := s.users[id]
	return u, ok
}

func (s *UserStore) create(u User) User {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.add(u)
}

func (s *UserStore) update(id int, u User) (User, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.users[id]; !ok {
		return User{}, false
	}
	u.ID = id
	s.users[id] = u
	return u, true
}

func (s *UserStore) delete(id int) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.users[id]; !ok {
		return false
	}
	delete(s.users, id)
	return true
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

type Handler struct {
	store *UserStore
}

func (h *Handler) getUsers(c *gin.Context) {
	nameFilter := c.Query("name")
	users := h.store.getAll(nameFilter)
	c.JSON(http.StatusOK, gin.H{"data": users, "count": len(users)})
}

func (h *Handler) getUserByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id must be an integer"})
		return
	}
	user, ok := h.store.getByID(id)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("user %d not found", id)})
		return
	}
	c.JSON(http.StatusOK, user)
}

func (h *Handler) createUser(c *gin.Context) {
	var u User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	created := h.store.create(u)
	c.JSON(http.StatusCreated, created)
}

func (h *Handler) updateUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id must be an integer"})
		return
	}
	var u User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updated, ok := h.store.update(id, u)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("user %d not found", id)})
		return
	}
	c.JSON(http.StatusOK, updated)
}

func (h *Handler) deleteUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id must be an integer"})
		return
	}
	if !h.store.delete(id) {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("user %d not found", id)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("user %d deleted", id)})
}

// ─── Middleware ───────────────────────────────────────────────────────────────

func requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Printf("[LOG] %s %s\n", c.Request.Method, c.Request.URL.Path)
		c.Next()
		fmt.Printf("[LOG] → %d\n", c.Writer.Status())
	}
}

// ─── Main ─────────────────────────────────────────────────────────────────────

func main() {
	store := NewUserStore()
	h := &Handler{store: store}

	r := gin.Default()
	r.Use(requestLogger())

	api := r.Group("/api")
	{
		users := api.Group("/users")
		users.GET("", h.getUsers)
		users.GET("/:id", h.getUserByID)
		users.POST("", h.createUser)
		users.PUT("/:id", h.updateUser)
		users.DELETE("/:id", h.deleteUser)
	}

	fmt.Println("Server running at http://localhost:8080")
	fmt.Println("Try: curl http://localhost:8080/api/users")
	r.Run(":8080")
}
