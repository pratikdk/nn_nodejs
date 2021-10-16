const express = require("express");

const app = express();
app.listen(3000);

app.get("/", (req, res) => {
    // res.send("<h1>Home Page</p>");
    res.sendFile("./views/index.html", { root: __dirname });
})

app.get("/about", (req, res) => {
    // res.send("<h1>About Page</p>");
    res.sendFile("./views/about.html", { root: __dirname });
})

app.get("/about_us", (req, res) => {
    res.redirect("/adout");
})

app.use((req, res) => {
    res.sendFile("./views/404.html", { root: __dirname });
})