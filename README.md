# SWYNEX Backend Internship — Tasks 2 & 3

## Task Management REST API

A REST API built with Node.js, Express.js, and SQLite. It supports persistent task management, CRUD operations, input validation, API key authentication, and a health-check endpoint.

**Developer:** Hania Batool  
**GitHub Repository:** https://github.com/Haniabatool72/swynex-task1  
**Local API URL:** http://localhost:3000  
**Live Service URL:** Not deployed yet.

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- dotenv
- Thunder Client for API testing

## Features

- Create, read, update, and delete tasks.
- Store task records persistently using SQLite.
- Validate incoming request data.
- Protect task endpoints with API key authentication.
- Return appropriate errors for missing or invalid API keys.
- Provide a health-check endpoint.
- Handle invalid JSON requests.

## Installation and Setup

### Prerequisites

Install Node.js and npm.

### 1. Clone the repository

```bash
git clone https://github.com/Haniabatool72/swynex-task1.git
cd swynex-task1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
API_KEY=replace_with_your_own_secret_key
```

Use your own secure API key. Never commit the `.env` file or publish your real secret key.

### 4. Start the server

```bash
node server.js
```

The local server should be available at:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/health` | Check server status | Not required |
| POST | `/api/tasks` | Create a task | Required |
| GET | `/api/tasks` | Retrieve all tasks | Required |
| GET | `/api/tasks/:id` | Retrieve a task by ID | Required |
| PUT | `/api/tasks/:id` | Update a task | Required |
| DELETE | `/api/tasks/:id` | Delete a task | Required |

## Authentication

Task endpoints require the following HTTP header:

```http
x-api-key: YOUR_API_KEY
```

The API key is read from the server's environment configuration.

Authentication responses:

- `401 Unauthorized` — API key is missing.
- `401 Unauthorized` — API key is invalid.

The `/health` endpoint does not require an API key.

## Sample Data

Example task object:

```json
{
  "title": "Learn Node.js",
  "description": "Practice backend development"
}
```

Example successful task response:

```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Practice backend development",
  "completed": 0
}
```

The task ID is assigned by the database. Actual IDs may differ.

## Sample API Requests

Replace `YOUR_API_KEY` with the API key configured in your local `.env` file.

### Health check

```http
GET http://localhost:3000/health
```

### Create a task

```http
POST http://localhost:3000/api/tasks
x-api-key: YOUR_API_KEY
Content-Type: application/json
```

Request body:

```json
{
  "title": "Learn API Authentication",
  "description": "Practice securing API endpoints"
}
```

### Get all tasks

```http
GET http://localhost:3000/api/tasks
x-api-key: YOUR_API_KEY
```

### Get a task by ID

```http
GET http://localhost:3000/api/tasks/1
x-api-key: YOUR_API_KEY
```

### Update a task

```http
PUT http://localhost:3000/api/tasks/1
x-api-key: YOUR_API_KEY
Content-Type: application/json
```

Request body:

```json
{
  "title": "Learn Express.js",
  "description": "Practice API development",
  "completed": true
}
```

### Delete a task

```http
DELETE http://localhost:3000/api/tasks/1
x-api-key: YOUR_API_KEY
```

## Testing

