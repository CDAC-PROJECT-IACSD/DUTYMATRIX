# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["DutyMatrix.LoggerService.csproj", "./"]
RUN dotnet restore "./DutyMatrix.LoggerService.csproj"
COPY . .
RUN dotnet build "DutyMatrix.LoggerService.csproj" -c Release -o /app/build
RUN dotnet publish "DutyMatrix.LoggerService.csproj" -c Release -o /app/publish

# Run stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:4000
EXPOSE 4000
ENTRYPOINT ["dotnet", "DutyMatrix.LoggerService.dll"]
