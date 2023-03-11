const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
let db = require("./db/db.json")



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", function(req, res) {
    console.log(db)
    res.json(db)
    fs.readFile("db/db.json", function(data) {
        console.log(data)
        var notes = [].concat(JSON.parse(data))
         console.log(notes)
        // res.json(notes);
    })
});

app.post("/api/notes", function(req, res) {
   
    // readFileAsync("db/db.json", utf8).then(function(data) {
       const note = {
        title: req.body.title,
        text: req.body.text,
        };
       note.id = db.length + 1
       db.push(note);
    //    return note }).then(function(notes) {
        // fs.writeFile("/db/db.json", JSON.stringify(notes))
        res.json(db);
    // })
});


app.delete("/api/notes", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("db/db.json", "utf8").then(function(data) {
       const notes = [].connect(JSON.parse(data));
       const newNotesData = []
       for (let i = 0; i<notes.length; i++) {
        if(idToDelete !== notes[i].id) {
            newNotesData.push(notes[i]) }
        }
        return newNotesData }).then(function(notes) {
        writeFileAsync("db/db.json", JSON.stringify(notes))
        res.send('Saved Successfully!');
    })
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.listen(PORT, () =>
console.log('App listening at https://localhost.com:${port}')
);