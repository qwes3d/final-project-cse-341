const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  deleteAdmin,
  getAllUsers,
  deleteUserByAdmin
} = require("../controllers/adminController.js");
const validate = require("../middleware/validate.js");
const { auth, authorizeRoles } = require("../middleware/auth.js");
const adminSchema = require("../validations/adminValidation.js");

const router = express.Router();

// Auth
router.post("/register", validate(adminSchema), registerAdmin);
router.post("/login", loginAdmin);

// Admin management (superadmin only)
router.get("/", auth, authorizeRoles("superadmin"), getAllAdmins);
router.delete("/:id", auth, authorizeRoles("superadmin"), deleteAdmin);

// User management (admin + superadmin)
router.get("/users", auth, authorizeRoles("admin", "superadmin"), getAllUsers);
router.delete("/users/:id", auth, authorizeRoles("admin", "superadmin"), deleteUserByAdmin);

module.exports = router;
