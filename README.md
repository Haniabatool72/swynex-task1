# SWYNEX Backend Internship — Task 2

## Database and CRUD Operations

This project is a REST API built with Node.js and Express.js. It uses SQLite to store task data persistently and supports CRUD operations with basic input validation.

## Technologies Used

* Node.js
* Express.js
* SQLite Database
* better-sqlite3
* dotenv

## Features

* Create a new task
* View all tasks
* View a task by ID
* Update task details
* Delete a task
* Validate incoming data
* Store tasks in a database
* Health-check endpoint

## Installation and Setup

1. Clone or download this repository.
2. Open the project folder in your terminal.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node server.js
```

The API runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint         | Purpose             |
| ------ | ---------------- | ------------------- |
| GET    | `/health`        | Check server status |
| POST   | `/api/tasks`     | Create a task       |
| GET    | `/api/tasks`     | Get all tasks       |
| GET    | `/api/tasks/:id` | Get a task by ID    |
| PUT    | `/api/tasks/:id` | Update a task       |
| DELETE | `/api/tasks/:id` | Delete a task       |

## Example Request

Create a task using JSON:

```json
{
  "title": "Learn Node.js",
  "description": "Practice backend development"
}
```

## Testing

The API was tested using PowerShell requests. Create, Read, Update, and Delete operations were successfully tested.

## Database

SQLite stores task records locally. The database file is created by the application when required.

## Developer

**Developed by Hania Batool**

SWYNEX Backend Internship — Task 2: Database and CRUD Operations
