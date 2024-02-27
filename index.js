const express = require("express");

const app = express();

const port = 8080;

const path = require("path");

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        username: "apnacollege",
        content: "I love coding"
    },
    {
        username: "dineshsaini",
        content: "Hard work is import to achieve success"
    },
    {
        username: "neha",
        content: "I got selected for 1st internship!!"
    }
];


app.get("/posts", (req, res) => {
    // res.send("Server working well!!");
    res.render("index.ejs", {posts});
});

app.listen(port, () => {
    console.log(`listening to port : ${port}`);
});