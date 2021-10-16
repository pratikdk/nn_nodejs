const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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
    res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create New Blog" })
});

app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render("home", { blogs: result, title: "Home" });
        })
        .catch(err => {
            console.log(err);
        })
});

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(err);
        })
});

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render("details", {blog: result, title: result.title });
        })
        .catch(err => {
            console.log(err);
            res.redirect("/404");
        });
});

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: "/blogs"
            });
        })
        .catch(err => {
            console.log(err);
        });
})

// app.get("/add-blog", (req, res) => {
//     const blog = new Blog({
//         title: "New Blog 2",
//         snippet: "About my new blog",
//         body: "more about my new blog"
//     });
//     blog.save()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });

// app.get("/all-blogs", (req, res) => {
//     Blog.find()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err); 
//         });
// })

// app.get("/single-blog", (req, res) => {
//     Blog.findById("6150a2418ed8e4e923a0cc8d")
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// })

// app.post("/blogs", (req, res) => {
//     console.log(req.body)
// });

app.use((req, res) => {
    res.render("404", { title: "404: Resource not found"})
});
