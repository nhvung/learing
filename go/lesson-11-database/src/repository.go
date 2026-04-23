package main

import (
	"fmt"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) FindAll() ([]User, error) {
	var users []User
	result := r.db.Find(&users)
	return users, result.Error
}

func (r *UserRepository) FindByID(id uint) (User, error) {
	var user User
	result := r.db.First(&user, id)
	if result.Error == gorm.ErrRecordNotFound {
		return User{}, fmt.Errorf("user %d not found", id)
	}
	return user, result.Error
}

func (r *UserRepository) Create(user User) (User, error) {
	result := r.db.Create(&user)
	return user, result.Error
}

func (r *UserRepository) Update(id uint, updates User) (User, error) {
	var user User
	if err := r.db.First(&user, id).Error; err != nil {
		return User{}, fmt.Errorf("user %d not found", id)
	}
	user.Name = updates.Name
	user.Email = updates.Email
	user.Role = updates.Role
	result := r.db.Save(&user)
	return user, result.Error
}

func (r *UserRepository) Delete(id uint) error {
	result := r.db.Delete(&User{}, id)
	if result.RowsAffected == 0 {
		return fmt.Errorf("user %d not found", id)
	}
	return result.Error
}
