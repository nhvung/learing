using Microsoft.EntityFrameworkCore;

namespace Lesson11;

public interface IUserRepository
{
    Task<List<UserDto>> GetAllAsync();
    Task<UserDto?> GetByIdAsync(int id);
    Task<UserDto> CreateAsync(CreateUserDto dto);
    Task<UserDto?> UpdateAsync(int id, UpdateUserDto dto);
    Task<bool> DeleteAsync(int id);
    Task<List<PostDto>> GetPostsAsync(int userId);
    Task<PostDto> AddPostAsync(int userId, CreatePostDto dto);
}

public class UserRepository(AppDbContext db) : IUserRepository
{
    public async Task<List<UserDto>> GetAllAsync() =>
        await db.Users
            .Include(u => u.Posts)
            .Select(u => new UserDto(u.Id, u.Name, u.Email, u.CreatedAt, u.Posts.Count))
            .ToListAsync();

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var u = await db.Users
            .Include(u => u.Posts)
            .FirstOrDefaultAsync(u => u.Id == id);
        return u is null ? null : new UserDto(u.Id, u.Name, u.Email, u.CreatedAt, u.Posts.Count);
    }

    public async Task<UserDto> CreateAsync(CreateUserDto dto)
    {
        var user = new User { Name = dto.Name, Email = dto.Email };
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return new UserDto(user.Id, user.Name, user.Email, user.CreatedAt, 0);
    }

    public async Task<UserDto?> UpdateAsync(int id, UpdateUserDto dto)
    {
        var user = await db.Users.FindAsync(id);
        if (user is null) return null;

        if (dto.Name is not null)  user.Name  = dto.Name;
        if (dto.Email is not null) user.Email = dto.Email;
        await db.SaveChangesAsync();

        return new UserDto(user.Id, user.Name, user.Email, user.CreatedAt, 0);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user = await db.Users.FindAsync(id);
        if (user is null) return false;
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        return true;
    }

    public async Task<List<PostDto>> GetPostsAsync(int userId) =>
        await db.Posts
            .Where(p => p.UserId == userId)
            .Select(p => new PostDto(p.Id, p.Title, p.Body, p.UserId))
            .ToListAsync();

    public async Task<PostDto> AddPostAsync(int userId, CreatePostDto dto)
    {
        var post = new Post { Title = dto.Title, Body = dto.Body, UserId = userId };
        db.Posts.Add(post);
        await db.SaveChangesAsync();
        return new PostDto(post.Id, post.Title, post.Body, post.UserId);
    }
}
