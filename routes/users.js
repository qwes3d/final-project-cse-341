const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userSchema = require("../validations/userValidation");
const validate = require("../middleware/validate");
const {auth} = require("../middleware/auth");

// Public routes
router.post("/register", validate(userSchema), userController.registerUser);
router.post("/login", userController.loginUser);

// Protected routes
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, validate(userSchema), userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
