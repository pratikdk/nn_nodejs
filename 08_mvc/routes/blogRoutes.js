const express = require("express");
const blogController = require("../controllers/blogControllers")

const expressRouter = express.Router();


expressRouter.get("/blogs", blogController.blog_index);

expressRouter.get("/blogs/create", blogController.blog_create_get);

expressRouter.post("/blogs", blogController.blog_create_post);

expressRouter.get("/blogs/:id", blogController.blog_details);

expressRouter.delete("/blogs/:id", blogController.blog_delete)

module.exports = expressRouter;