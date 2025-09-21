const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const postSchema = require("../validations/postValidation");
const validate = require("../middleware/validate");
const {auth} = require("../middleware/auth");

// Protected routes (all require login)
router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getPostById);
router.post("/", auth, validate(postSchema), postController.createPost);
router.put("/:id", auth, validate(postSchema), postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;
