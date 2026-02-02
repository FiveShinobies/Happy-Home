FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

# Make mvnw executable
RUN chmod +x mvnw

# Build jar
RUN ./mvnw clean package -DskipTests

# Rename jar to fixed name
RUN mv target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
