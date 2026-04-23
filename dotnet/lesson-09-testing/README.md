# Lesson 09 – Testing (xUnit)

## Topics
- xUnit test project structure (separate `.csproj`)
- `[Fact]` for single-case tests
- `[Theory]` + `[InlineData]` for table-driven tests
- `Assert.Equal`, `Assert.True`, `Assert.Throws`, `Assert.ThrowsAsync`
- `ITestOutputHelper` for test output
- `IClassFixture<T>` for shared setup
- `WebApplicationFactory<T>` for integration tests
- Test naming convention: `Method_Scenario_ExpectedResult`
- Running a single test / class / trait

## Run

```bash
cd src
dotnet test                                 # all tests
dotnet test --filter "ClassName~Calculator" # class filter
dotnet test --filter "DisplayName~divide"   # name filter
dotnet test -v normal                       # verbose output
```

## Exercise

```bash
cd exercises && dotnet test
```
