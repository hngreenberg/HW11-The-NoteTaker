const express = require('express');
const path = require('path');
const fs = require('fs');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", function(req, res) {
    readFileAsync("./db/db.json", "utf8").then(function(data) {
        notes = [].connect(JSON.parse(data))
        res.json(notes);
    })
});

app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./db/db.json", "utf8").then(function(data) {
       const notes = [].connect(JSON.parse(data));
       note.id = notes.length + 1
       notes.push(notes);
       return notes }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});


app.delete("/api/notes", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./db/db.json", "utf8").then(function(data) {
       const notes = [].connect(JSON.parse(data));
       const newNotesData = []
       for (let i = 0; i<notes.length; i++) {
        if(idToDelete !== notes[i].id) {
            newNotesData.push(notes[i]) }
        }
        return newNotesData }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.send('Saved Successfully!');
    })
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"))
});

app.listen(PORT, () =>
console.log('App listening at http://localhost:${PORT}')
);