namespace Lesson08;

public interface IUserService
{
    IEnumerable<User> GetAll();
    User? GetById(int id);
    User Create(CreateUserRequest req);
    User? Update(int id, UpdateUserRequest req);
    bool Delete(int id);
}

public class InMemoryUserService : IUserService
{
    private readonly Dictionary<int, User> _store = new()
    {
        [1] = new User(1, "Alice", "alice@example.com"),
        [2] = new User(2, "Bob",   "bob@example.com"),
    };
    private int _nextId = 3;

    public IEnumerable<User> GetAll() => _store.Values;

    public User? GetById(int id) =>
        _store.TryGetValue(id, out var u) ? u : null;

    public User Create(CreateUserRequest req)
    {
        var user = new User(_nextId++, req.Name, req.Email);
        _store[user.Id] = user;
        return user;
    }

    public User? Update(int id, UpdateUserRequest req)
    {
        if (!_store.TryGetValue(id, out var existing)) return null;
        var updated = existing with
        {
            Name  = req.Name  ?? existing.Name,
            Email = req.Email ?? existing.Email,
        };
        _store[id] = updated;
        return updated;
    }

    public bool Delete(int id) => _store.Remove(id);
}
