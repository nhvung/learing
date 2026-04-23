namespace AccountManager.Models;

public class Account
{
    public long Id { get; set; }
    public string Name { get; set; } = "";
    public string? Address { get; set; }
    public string Email { get; set; } = "";
    public int Status { get; set; } = 1;
    public long CreatedTime { get; set; }
    public long UpdatedTime { get; set; }
}
