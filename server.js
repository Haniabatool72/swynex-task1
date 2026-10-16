
const express = require("express");
require("dotenv").config();
const Database = require("better-sqlite3");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      status: status
    }
  });
}

function authenticate(req, res, next) {
  const apiKey = req.get("x-api-key");
  const expectedKey = process.env.API_KEY;

  if (!expectedKey || !apiKey) {
    return sendError(res, 401, "API key required");
  }

  if (apiKey !== expectedKey) {
    return sendError(res, 401, "Invalid API key");
  }

  next();
}



// Persistent SQLite database
const db = new Database("swynex.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    completed INTEGER NOT NULL DEFAULT 0
  )
`);

// Health check (Task 1)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SWYNEX backend is running successfully"
  });
});

// READ all tasks
app.use("/api/tasks", authenticate);
app.get("/api/tasks", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks ORDER BY id DESC").all();
  res.json(tasks);
});

// READ one task
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// CREATE a task
app.post("/api/tasks", (req, res) => {
  const { title, description = "" } = req.body || {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (title.trim().length > 100) {
    return res.status(400).json({ error: "Title must be 100 characters or fewer" });
  }

  if (typeof description !== "string" || description.length > 500) {
    return res.status(400).json({
      error: "Description must be text and 500 characters or fewer"
    });
  }

  const result = db.prepare(
    "INSERT INTO tasks (title, description) VALUES (?, ?)"
  ).run(title.trim(), description.trim());

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(task);
});

// UPDATE a task
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body || {};

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const existing = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (!existing) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (
    typeof title !== "string" || !title.trim() || title.trim().length > 100
  ) {
    return res.status(400).json({
      error: "A valid title (1–100 characters) is required"
    });
  }

  if (
    typeof description !== "string" || description.length > 500
  ) {
    return res.status(400).json({
      error: "Description must be text and 500 characters or fewer"
    });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Completed must be true or false"
    });
  }

  db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, completed = ?
    WHERE id = ?
  `).run(title.trim(), description.trim(), completed ? 1 : 0, id);

  res.json(db.prepare("SELECT * FROM tasks WHERE id = ?").get(id));
});

// DELETE a task
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  next(err);
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Close database cleanly when the server stops
function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);