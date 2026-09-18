const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS tasks (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    )`);
  console.log("Database Supabase terhubung & siap dipakai");
})();

app.get("/api/tasks", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title wajib diisi" });
  try {
    const { rows } = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING id",
      [title, false],
    );
    res.json({ id: rows[0].id, title, completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  const { title, completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3",
      [title, completed, req.params.id],
    );
    res.json({ message: "Task diupdate", changes: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [
      req.params.id,
    ]);
    res.json({ message: "Task dihapus", changes: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend berjalan di port ${port}`);
});