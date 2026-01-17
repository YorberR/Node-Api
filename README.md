# 🛡️ Node.js Enterprise-Ready REST API

![NodeJS](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

A robust and secure RESTful API built with **Node.js**, **Express**, and **Sequelize**. This project goes beyond basic CRUD operations by implementing industry standards for security, performance optimization, and architectural scalability.

### 🚀 [Explore the Live Documentation (Swagger UI)](https://node-api-6egn.onrender.com/api-docs/)

---

## ⚡ Key Features

This API is engineered with production-grade best practices:

### 🛡️ Security & Integrity
* **Data Validation:** Strict input validation using **Joi** schemas to prevent bad data injection.
* **Protection Headers:** Implemented **Helmet** to secure HTTP headers against common vulnerabilities.
* **Rate Limiting:** Protects against DDoS and brute-force attacks using `express-rate-limit`.
* **CORS:** Configured to allow secure cross-origin requests.

### 🚀 Performance
* **Caching:** Implements **node-cache** to reduce database load and speed up response times for frequent requests.
* **Compression:** Uses Gzip compression to minimize payload size and bandwidth usage.
* **Pagination:** Efficient data retrieval for large datasets.

### 🏗️ Architecture
* **ORM:** Uses **Sequelize** for database abstraction (supports PostgreSQL, MySQL, SQLite).
* **Error Handling:** Centralized error management using **@hapi/boom** for consistent HTTP status codes.
* **Containerization:** Fully Dockerized for consistent development and deployment environments.

---

## 🛠️ Tech Stack

* **Core:** Node.js, Express.js
* **Database:** Sequelize ORM (configured with SQLite for this demo, compatible with PostgreSQL).
* **Validation:** Joi
* **Docs:** Swagger UI / OpenAPI
* **DevOps:** Docker, Docker Compose
* **Testing:** Mocha (Setup included)

---

## 📂 Project Structure

```text
├── src
│   ├── config/       # Environment & Database config
│   ├── db/           # Models, Migrations, Seeds
│   ├── libs/         # Sequelize & external clients
│   ├── middlewares/  # Error handler, Validation, Auth
│   ├── routes/       # API Routes definitions
│   ├── services/     # Business Logic (Service Layer)
│   ├── schemas/      # Joi Validation Schemas
│   └── index.js      # App Entry point
```

---

## 💻 Installation & Local Run
**Option A: Standard NPM**
1. Clone the repository:

```bash
git clone [https://github.com/YorberR/Node-Api.git](https://github.com/YorberR/Node-Api.git)
cd Node-Api
```

2. Install dependencies:

```bash
npm install
```

3. Environment Setup: Create a .env file based on .env.example:

```bash
PORT=3000
DB_USER='user'
DB_PASSWORD='password'
DB_HOST='localhost'
DB_NAME='my_api'
DB_PORT='5432'
```

4. Run Development Server:

```bash
npm run dev
```

**Option B: Docker (Recommended)**
Run the application in a containerized environment instantly:

```bash
docker compose up -d
```

---

## ⚠️ API Protections (Demo Configuration)
To ensure fair usage of this demo, the following limits are active:

* **Rate Limit:** Max 100 requests per IP per 15 mins.

* **Creation Limit:** Max 10 POST requests per hour.

* **Timeout:** Requests aborted after 5 seconds.

* **Payload:** Max 10KB JSON body size.

* **Cache TTL:** Responses cached for 5 minutes.

---

## ☁️ Deployment
The API is deployed on **Render** (Free Tier).

**Note:** The application uses an in-memory/file-based database for the demo. Data resets on every deployment or cold start.

---

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.