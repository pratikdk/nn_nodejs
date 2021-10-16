const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes")

// Create server
const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Connect to db and start listening
const dbURI = "mongodb+srv://user_01:user1234@fslearn.iqmmd.mongodb.net/nodeninja?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("connected to db");
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })

// specify middleware for logger and static content folder
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


// Handlers
app.get("/", (req, res) => {
    res.redirect("/blogs");
    //res.render("home", {blogs: [], title: "Home"});
});

app.get("/about", (req, res) => {
    res.render("about", {blogs: [], title: "About"});
});

app.use(blogRouter); //make more modular, app.use('/blogs', blogRouter);

app.use((req, res) => {
    res.render("404", { title: "404: Resource not found"})
});
