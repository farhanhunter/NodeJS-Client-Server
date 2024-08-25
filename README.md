# CRUD Application with Express, PostgreSQL, and Node.js Client

This project is a simple CRUD (Create, Read, Update, Delete) application using Express.js as the backend framework, PostgreSQL as the database, and a Node.js command-line client for interacting with the API.

## Features

- Express.js backend with RESTful API endpoints
- PostgreSQL database for data persistence
- Docker setup for easy database and pgAdmin deployment
- Node.js command-line client for API interaction
- Sequelize ORM for database operations

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Docker](https://www.docker.com/) and Docker Compose
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/farhanhunter/NodeJS-Client-Server.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the PostgreSQL database and pgAdmin using Docker Compose:

   ```
   docker-compose up -d
   ```

4. Create a `.env` file in the root directory and add the following:

   ```
   DATABASE_URL=postgres://admin:admin123@localhost:5432/mydatabase
   ```

5. Run database migrations:

   ```
   npx sequelize-cli db:migrate
   ```

6. Start the Express server:
   ```
   npm start
   ```

## Usage

### Express Server

The Express server will be running on `http://localhost:4000` by default. It provides the following endpoints:

- `GET /items`: Fetch all items
- `GET /items/:id`: Fetch a specific item
- `POST /items`: Create a new item
- `PUT /items/:id`: Update an existing item
- `DELETE /items/:id`: Delete an item

### Node.js Client

To use the Node.js client:

1. Open a new terminal window
2. Navigate to the project directory
3. Run the client:
   ```
   node client.js
   ```
4. Follow the on-screen prompts to interact with the API

## Database Management

pgAdmin is available at `http://localhost:8080`. Use the following credentials to log in:

- Email: admin@admin.com
- Password: admin123

After logging in, you can add a new server with the following details:

- Host: db
- Port: 5432
- Database: mydatabase
- Username: admin
- Password: admin123

## Development

To run the server in development mode with auto-reloading:

```
npm run dev
```

## Testing

(Add information about running tests if you have implemented any)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
