namespace Lesson08;

public record User(int Id, string Name, string Email);

public record CreateUserRequest(string Name, string Email);

public record UpdateUserRequest(string? Name, string? Email);
