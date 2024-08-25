# Manga CRUD Application with Express, PostgreSQL, and Node.js Client

This project is a CRUD (Create, Read, Update, Delete) application for managing manga data. It uses Express.js as the backend framework, PostgreSQL as the database, and includes a Node.js command-line client for interacting with the API.

## Features

- Express.js backend with RESTful API endpoints for manga management
- PostgreSQL database for persistent storage of manga data
- Docker setup for easy database and pgAdmin deployment
- Node.js command-line client for API interaction
- Sequelize ORM for database operations
- Comprehensive manga data model including title, author, genres, and more
- Search functionality for manga by title, author, or genre

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Docker](https://www.docker.com/) and Docker Compose
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/farhanhunter/NodeJS-Client-Server.git
   cd manga-crud-app
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

- `GET /mangas`: Fetch all mangas
- `GET /mangas/:id`: Fetch a specific manga
- `POST /mangas`: Create a new manga
- `PUT /mangas/:id`: Update an existing manga
- `DELETE /mangas/:id`: Delete a manga
- `GET /mangas/search`: Search mangas by title, author, or genre

### Node.js Client

To use the Node.js client:

1. Open a new terminal window
2. Navigate to the project directory
3. Run the client:
   ```
   node client.js
   ```
4. Follow the on-screen prompts to interact with the API

The client provides options to create, read, update, delete, and search for mangas.

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

## Manga Data Model

The manga data model includes the following fields:

- `title`: The title of the manga
- `original_title`: The original title (e.g., in Japanese)
- `author`: The author of the manga
- `artist`: The artist (if different from the author)
- `description`: A brief description or synopsis
- `status`: Publication status (Ongoing, Completed, Hiatus, or Cancelled)
- `publication_year`: Year of first publication
- `demographic`: Target demographic (e.g., Shounen, Shoujo)
- `genres`: Array of genres
- `themes`: Array of themes
- `cover_image_url`: URL to the cover image
- `publisher`: The publisher of the manga
- `total_chapters`: Total number of chapters
- `average_rating`: Average user rating

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
