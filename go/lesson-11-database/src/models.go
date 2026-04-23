package main

import "gorm.io/gorm"

// User is the database model. gorm.Model adds:
//   ID        uint (primary key, auto-increment)
//   CreatedAt time.Time
//   UpdatedAt time.Time
//   DeletedAt gorm.DeletedAt (soft delete)
type User struct {
	gorm.Model
	Name  string `gorm:"not null"        json:"name"  binding:"required"`
	Email string `gorm:"uniqueIndex;not null" json:"email" binding:"required,email"`
	Role  string `gorm:"default:user"    json:"role"`
}

// UserResponse is returned to the API caller — excludes internal GORM fields.
type UserResponse struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
}

func toResponse(u User) UserResponse {
	return UserResponse{
		ID:    u.ID,
		Name:  u.Name,
		Email: u.Email,
		Role:  u.Role,
	}
}
