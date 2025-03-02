# 🚀 Java Backend Authentication with JWT

## 🌟 Overview
Welcome to the **Java Backend Authentication System**! This project leverages **JWT (JSON Web Token)** to provide secure authentication and authorization for your applications. Plus, it’s **Docker-ready** for hassle-free deployment! 🐳💨

## ✨ Features
✅ User authentication with JWT 🔐  
✅ Secure password hashing 🔑  
✅ Token-based authentication 🔄  
✅ Refresh token mechanism 🔄🔑  
✅ Easy deployment with Docker 🚀  

## 🛠️ Technologies Used
🔹 Java 22+  
🔹 Spring Boot & Spring Security  
🔹 JWT (JSON Web Token)  
🔹 MySQL  
🔹 JPA (Hibernate)  
🔹 Docker & Docker Compose  

## ⚙️ Installation & Setup

### 📌 Prerequisites
Before you begin, make sure you have the following installed:
- ☕ Java 22+
- 🛠️ Maven
- 🐳 Docker & Docker Compose
- 🗄️ MySQL/PostgreSQL

### 🚀 Steps to Get Started
1️⃣ Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2️⃣ Configure database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

### 💻 Running Locally (Without Docker)
3️⃣ Start the application:
   ```sh
   mvn spring-boot:run
   ```
4️⃣ The server will start at **`http://localhost:8090`** 🌍

### 🐳 Running with Docker
1️⃣ Build the JAR file:
   ```sh
   mvn clean package -DskipTests
   ```
2️⃣ Build the Docker image:
   ```sh
   docker build -t auth-backend .
   ```
3️⃣ Run the container:
   ```sh
   docker run -p 8090:8090 auth-backend
   ```
🔥 Or, with Docker Compose:
   ```sh
   docker-compose up --build
   ```

---
## 🎨 Frontend - Next.js Client App
Visit this Repo
https://github.com/AuserZ/FEAuthWithJWT

## 🔥 API Endpoints

### 🔑 Authentication
- **🔹 POST** `/api/auth/register` → Register a new user 👤
- **🔹 POST** `/api/auth/login` → Authenticate and receive JWT 🛡️
- **🔹 POST** `/api/auth/refresh` → Refresh JWT token 🔄
- **🔹 POST** `/api/auth/logout` → Logout 🏁

## 🚀 Usage
- Use **Postman** or **cURL** to test API endpoints.
- Attach the JWT token in the `Authorization` header as:
  ```sh
  Authorization: Bearer <token>
  ```

## 📜 License
📝 This project is **licensed under the MIT License**.

---

## 🤝 Contributing
🚀 Want to improve this project? Feel free to submit a **pull request** or **open an issue**!

## 📧 Contact
📩 Reach out for any inquiries via **muhziqinakbar@gmail.com** or open an **issue**.

---

🚀 **Now go ahead and build something amazing!** 🎯🔥

