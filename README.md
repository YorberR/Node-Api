# Node-Api

Node-Api is a personal project that provides a simple API built with Node.js, Express, and Sequelize to manage data in a PostgreSQL database. This project includes features like data validation with Joi, error handling with @hapi/boom, and uses various other packages to enhance the development process.

## Project Structure

- **src**: Main source code directory.
  - **controllers**: Request handlers.
  - **middleware**: Custom middleware functions.
  - **models**: Sequelize models.
  - **routes**: API routes.
  - **services**: Business logic and database interactions.
  - **utils**: Utility functions.
- **tests**: Directory containing test files.

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

- npm run dev: Start the server in development mode using nodemon.

- npm start: Start the server in production mode.

- npm run lint: Run ESLint to check code syntax.

- npm test: Run tests using Mocha.

- npm run migrations:generate: Generate a new migration using Sequelize CLI.

- npm run migrations:run: Run all pending migrations.

- npm run migrations:revert: Revert the last executed migration.

- npm run migrations:delete: Revert all migrations.

## Environment Variables

Create a .env file in the root directory based on the .env.example file. Here is an example of the content of .env.example:

PORT=3000
DB_USER='user'
DB_PASSWORD='password'
DB_HOST='localhost'
DB_NAME='my_api'
DB_PORT='5432'

## Docker Configuration

- Ensure you have Docker and Docker Compose installed on your system.

- Start the Docker containers:

    ```bash
    docker-compose up -d

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## How to Contribute
Contributions are welcome. Please open an issue or submit a pull request to discuss any changes you would like to make.
