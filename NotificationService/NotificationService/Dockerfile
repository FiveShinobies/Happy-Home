FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy published output
COPY bin/Release/net8.0/publish/ .

# Expose notification service port
EXPOSE 5253

# Tell ASP.NET to listen on all interfaces
ENV ASPNETCORE_URLS=http://+:5253

# Start the app
ENTRYPOINT ["dotnet", "NotificationService.dll"]
