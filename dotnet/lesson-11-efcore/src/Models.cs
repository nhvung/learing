using System.ComponentModel.DataAnnotations;

namespace Lesson11;

public class User
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property — one user has many posts
    public List<Post> Posts { get; set; } = [];
}

public class Post
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Body { get; set; } = string.Empty;

    public int UserId { get; set; }
    public User User { get; set; } = null!; // navigation back-ref
}

// DTOs (Data Transfer Objects — never expose raw EF entities over HTTP)
public record CreateUserDto(string Name, string Email);
public record UpdateUserDto(string? Name, string? Email);
public record UserDto(int Id, string Name, string Email, DateTime CreatedAt, int PostCount);
public record CreatePostDto(string Title, string Body);
public record PostDto(int Id, string Title, string Body, int UserId);
