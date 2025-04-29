# Node-Api

Node-Api is a personal project that provides a simple API built with Node.js, Express, and Sequelize to manage data in a SQLite database. This project includes features like data validation with Joi, error handling with @hapi/boom, and uses various other packages to enhance the development process.

## Features

- **Data Validation**: Implemented with Joi to ensure data integrity.
- **Error Handling**: Using @hapi/boom for consistent error responses.
- **API Documentation**: Swagger UI for interactive API documentation.
- **Rate Limiting**: Protection against abuse with express-rate-limit.
- **Caching**: Performance enhancement with node-cache.
- **Security**: Implementation of helmet for HTTP header protection.
- **Compression**: Compressed responses for better performance.
- **Usage Monitoring**: Tracking of API usage.
- **SQLite Database**: Lightweight, file-based database for easy deployment.

## Project Structure

- **config**: Configuration files. 
- **db**: Database-related files (models, migrations, seeds). 
- **libs**: Custom libraries. 
- **middleware**: Custom middleware functions. 
- **routes**: API routes. 
- **schema**: Data validation schemas. 
- **server**: Server setup and initialization. 
- **services**: Business logic and database interactions. 
- **test**: Directory containing tests.
- **logs**: Usage and error logs.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YorberR/Node-Api.git
   cd Node-Api


2. **Install dependencies:**

    ```bash
    npm install

## Using npm Commands

- `npm run dev`: Start the server in development mode using nodemon.

- `npm start`: Start the server in production mode.

- `npm run lint`: Run ESLint to check code syntax.

- `npm test`: Run tests using Mocha.

- `npm run migrations:generate`: Generate a new migration using Sequelize CLI.

- `npm run migrations:run`: Run all pending migrations.

- `npm run migrations:revert`: Revert the last executed migration.

- `npm run migrations:delete`: Revert all migrations.

## Environment Variables

Create a `.env` file in the root directory based on the .env.example file. Here is an example of the content of .`env.example`:

```
PORT=3000
DB_USER='user'
DB_PASSWORD='password'
DB_HOST='localhost'
DB_NAME='my_api'
DB_PORT='5432'
```

## Docker Configuration

- Ensure you have Docker and Docker Compose installed on your system.

- Start the Docker containers:

    ```bash
    docker-compose up -d

## API Documentation

Interactive API documentation is available through Swagger UI:
- **Local Development**: http://localhost:3000/api-docs
- **Deployed Version**: https://node-api-6egn.onrender.com/api-docs

## Limitations and Protections

The API includes several measures to prevent abuse:
- **Rate Limiting**: 100 requests per IP every 15 minutes.
- **Creation Limiting**: 10 POST requests per hour.
- **Timeout**: Requests are canceled after 5 seconds.
- **Payload Size**: Limited to 10KB for JSON requests.
- **Caching**: Responses are cached for 5 minutes to improve performance.

## Deployment

The API is deployed on Render.com using their free plan:
- **Base URL**: https://node-api-6egn.onrender.com
- **Documentation**: https://node-api-6egn.onrender.com/api-docs

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## How to Contribute

Contributions are welcome. Please open an issue or submit a pull request to discuss any changes you would like to make.
