const express = require("express");

const app = express();

const port = 8080;

const path = require("path");

const {v4: uuidv4} = require('uuid');

const methodOverride = require('method-override');


app.use(express.urlencoded({extended: true}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding"
    }, {
        id: uuidv4(),
        username: "dineshsaini",
        content: "Hard work is import to achieve success"
    }, {
        id: uuidv4(),
        username: "neha",
        content: "I got selected for 1st internship!!"
    }
];


app.get("/posts", (req, res) => {
    // res.send("Server working well!!");
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    console.log(req.body);
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({id, username, content});
    // res.send("Post request working");
    res.redirect('/posts');
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    console.log(post);
    // res.send("request working");
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    // res.send("patch request working");
    res.redirect('/posts');
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.listen(port, () => {
    console.log(`listening to port : ${port}`);
});