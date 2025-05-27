FROM openjdk:17-jdk-slim AS builder
WORKDIR /app
COPY pom.xml .
RUN apt-get update && apt-get install -y maven \
    && mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests -T 4C

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
