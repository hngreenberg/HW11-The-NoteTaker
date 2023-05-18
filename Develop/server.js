const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  const note = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };
  db.push(note);
  fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(db), function (err) {
    if (err) throw err;
    res.json(db);
  });
});

app.delete("/api/notes/:id", function (req, res) {
  const idToDelete = req.params.id;
  const newNotesData = db.filter((note) => note.id !== idToDelete);
  fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNotesData), function (err) {
    if (err) throw err;
    res.send("Note deleted successfully!");
  });
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:3001`);
});
