const express = require("express");
const Blog = require("../models/blog");

const expressRouter = express.Router();

expressRouter.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create New Blog" })
});

expressRouter.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render("home", { blogs: result, title: "Home" });
        })
        .catch(err => {
            console.log(err);
        })
});

expressRouter.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(err);
        })
});

expressRouter.get("/blogs/:id", (req, res) => {
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

expressRouter.delete("/blogs/:id", (req, res) => {
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

module.exports = expressRouter;