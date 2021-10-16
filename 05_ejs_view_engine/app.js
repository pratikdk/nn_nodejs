const express = require("express");
const morgan = require("morgan");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(3000);

// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// })
app.use(express.static("public"));
app.use(morgan('dev'));

app.get("/", (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
    res.render("home", { title: "Home", blogs })
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" })
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create New Blog" })
});

app.use((req, res) => {
    res.render("404", { title: "404" })
});