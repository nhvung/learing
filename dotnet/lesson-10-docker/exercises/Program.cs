// Exercise: This app should run in Docker.
// 1. Complete the Dockerfile in this directory.
// 2. Run: docker build -t exercise-dotnet . && docker run --rm exercise-dotnet
// 3. Add a PORT environment variable and print it at startup.

string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Unknown";
string port = Environment.GetEnvironmentVariable("PORT") ?? "not set";

Console.WriteLine($"Hello from Docker!");
Console.WriteLine($"Environment: {env}");
Console.WriteLine($"PORT: {port}");
