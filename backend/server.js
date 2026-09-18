const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Simpan DB di folder /data (Nanti di-mount oleh Docker Volume)
const db = new sqlite3.Database("./data/database.sqlite");
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT, 
        completed BOOLEAN
    )`);
});

// ... [Copy semua kode app.get, app.post, app.put, app.delete dari sebelumnya] ...

app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  db.run(
    "INSERT INTO tasks (title, completed) VALUES (?, ?)",
    [title, false],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, completed: false });
    },
  );
});

app.put("/api/tasks/:id", (req, res) => {
  const { title, completed } = req.body;
  db.run(
    "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
    [title, completed, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Task diupdate", changes: this.changes });
    },
  );
});

app.delete("/api/tasks/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task dihapus", changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Backend berjalan di port ${port}`);
});
