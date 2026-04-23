using Lesson09;
using NSubstitute;
using NSubstitute.ExceptionExtensions;

namespace Tests;

public class UserServiceTests
{
    private readonly IUserRepository _repo;
    private readonly UserService _svc;

    public UserServiceTests()
    {
        // NSubstitute creates a mock/substitute for the interface
        _repo = Substitute.For<IUserRepository>();
        _svc  = new UserService(_repo);
    }

    // ── CreateUser ────────────────────────────────────────────────────────────

    [Fact]
    public void CreateUser_ValidInput_CallsRepoSaveAndReturnsUser()
    {
        var saved = new User(1, "alice", "alice@example.com");
        _repo.Save(Arg.Any<User>()).Returns(saved);

        var result = _svc.CreateUser("Alice", "alice@example.com");

        Assert.Equal(1,       result.Id);
        Assert.Equal("alice", result.Name);
        _repo.Received(1).Save(Arg.Any<User>());
    }

    [Theory]
    [InlineData("",    "alice@example.com")]
    [InlineData("   ", "alice@example.com")]
    public void CreateUser_EmptyName_ThrowsArgumentException(string name, string email)
    {
        Assert.Throws<ArgumentException>(() => _svc.CreateUser(name, email));
        _repo.DidNotReceive().Save(Arg.Any<User>());
    }

    [Theory]
    [InlineData("Alice", "")]
    [InlineData("Alice", "notanemail")]
    public void CreateUser_InvalidEmail_ThrowsArgumentException(string name, string email)
    {
        Assert.Throws<ArgumentException>(() => _svc.CreateUser(name, email));
    }

    // ── GetUser ───────────────────────────────────────────────────────────────

    [Fact]
    public void GetUser_ExistingId_ReturnsUser()
    {
        var user = new User(1, "Alice", "alice@example.com");
        _repo.FindById(1).Returns(user);

        var result = _svc.GetUser(1);

        Assert.Equal(user, result);
    }

    [Fact]
    public void GetUser_NonExistingId_ReturnsNull()
    {
        _repo.FindById(999).Returns((User?)null);

        var result = _svc.GetUser(999);

        Assert.Null(result);
    }

    // ── DeleteUser ────────────────────────────────────────────────────────────

    [Fact]
    public void DeleteUser_ExistingId_DeletesAndReturnsTrue()
    {
        var user = new User(1, "Alice", "alice@example.com");
        _repo.FindById(1).Returns(user);
        _repo.Delete(1).Returns(true);

        bool deleted = _svc.DeleteUser(1);

        Assert.True(deleted);
        _repo.Received(1).Delete(1);
    }

    [Fact]
    public void DeleteUser_NonExistingId_ThrowsKeyNotFoundException()
    {
        _repo.FindById(999).Returns((User?)null);

        Assert.Throws<KeyNotFoundException>(() => _svc.DeleteUser(999));
        _repo.DidNotReceive().Delete(Arg.Any<int>());
    }
}
