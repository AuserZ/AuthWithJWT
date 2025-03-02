# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR into the container
COPY target/auth-backend-0.0.1-SNAPSHOT.jar /app/auth-backend.jar

# Make port 8090 available to the world outside this container
EXPOSE 8090

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/auth-backend.jar"]