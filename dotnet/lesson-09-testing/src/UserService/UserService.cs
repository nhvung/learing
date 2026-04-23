namespace Lesson09;

public record User(int Id, string Name, string Email);

public interface IUserRepository
{
    User? FindById(int id);
    IEnumerable<User> FindAll();
    User Save(User user);
    bool Delete(int id);
}

public class UserService(IUserRepository repo)
{
    public User? GetUser(int id) => repo.FindById(id);

    public IEnumerable<User> GetAllUsers() => repo.FindAll();

    public User CreateUser(string name, string email)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name is required", nameof(name));
        if (string.IsNullOrWhiteSpace(email) || !email.Contains('@'))
            throw new ArgumentException("Valid email is required", nameof(email));

        var user = new User(0, name.Trim(), email.Trim().ToLower());
        return repo.Save(user);
    }

    public bool DeleteUser(int id)
    {
        if (repo.FindById(id) is null)
            throw new KeyNotFoundException($"User {id} not found");
        return repo.Delete(id);
    }
}
