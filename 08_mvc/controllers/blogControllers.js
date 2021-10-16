const Blog = require("../models/blog");

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render("blog/home", { blogs: result, title: "Home" });
        })
        .catch(err => {
            console.log(err);
        })
};


const blog_create_get = (req, res) => {
    res.render("blog/create", { title: "Create New Blog" })
};


const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(err);
        })
};


const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render("blog/details", {blog: result, title: result.title });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render("404", { title: "Page not found" });
        });
};


const blog_delete = (req, res) => {
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
};


module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete
};