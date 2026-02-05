# ---------- BUILD STAGE ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy csproj and restore dependencies
COPY NotificationService.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o /app/publish

# ---------- RUNTIME STAGE ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy published output from build stage
COPY --from=build /app/publish .

# Expose notification service port
EXPOSE 5253

# Tell ASP.NET to listen on all interfaces
ENV ASPNETCORE_URLS=http://+:5253

# Start the app
ENTRYPOINT ["dotnet", "NotificationService.dll"]

# Expose notification service port
EXPOSE 5253

# Tell ASP.NET to listen on all interfaces
ENV ASPNETCORE_URLS=http://+:5253

# Start the app
ENTRYPOINT ["dotnet", "NotificationService.dll"]
