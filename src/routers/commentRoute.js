const express = require("express");
const route = express.Router();
const commentController = require("../controllers/commentController");

//***************  get all comments by blog ID ********************************* */
route.get("/comments/:blogId", async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const comments = await commentController.getAllCommentByBlogId(blogId);
        res.json({
            message: "All comments for blog",
            status: 200,
            data: comments,
            success: true,
        });
    } catch (error) {
        res.json({
            message: "Error: " + error.message,
            status: 500,
            success: false,
        });
    }
});

//************  create comment *********************************************** */
route.post("/comments", async (req, res) => {
    try {
        const newComment = req.body;
        const createdComment = await commentController.createComment(newComment);
        res.json({
            message: "Comment created successfully",
            status: 201,
            data: createdComment,
            success: true,
        });
    } catch (error) {
        res.json({
            message: "Error: " + error.message,
            status: 500,
            success: false,
        });
    }
});

//**************** delete comment ********************************************** */
route.delete("/comments/:commentId", async (req, res) => {
    try {
        const commentId = req.params.commentId;
        await commentController.deleteComment(commentId);
        res.json({
            message: "Comment deleted successfully",
            status: 200,
            success: true,
        });
    } catch (error) {
        res.json({
            message: "Error: " + error.message,
            status: 500,
            success: false,
        });
    }
});

module.exports = route;
