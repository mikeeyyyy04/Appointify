# Appointify Backend

Backend API server for the Appointify clinic management system.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Hono
- **Database**: MongoDB with Mongoose
- **Authentication**: Token-based with Argon2 password hashing
- **Logging**: Winston

## Installation

```bash
bun install
```

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017
```

For MongoDB Atlas or remote MongoDB:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

## Running

Development mode with hot reload:
```bash
bun run dev
```

The server will start on `http://localhost:7325`

## API Server

The backend provides RESTful API endpoints for:
- User authentication (register, login, logout)
- Clinic management (CRUD operations)
- Serving number tracking
- Availability management

See the main [README.md](../README.md) for complete API documentation.

## Docker

Build and run with Docker:

```bash
docker build -t appointify-backend .
docker run -p 7325:7325 --env-file .env appointify-backend
```
