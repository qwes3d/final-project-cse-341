const express = requiren( "express");
const { sendMessage, getMyMessages, getSentMessages } = require ("../controllers/messageController.js");
const {auth} = require ( "../middleware/auth.js");
const validate = require ( "../middleware/validate.js");
const messageSchema = require ( "../validations/messageValidation.js");

const router = express.Router();

// All routes require login
router.post("/", auth, validate(messageSchema), sendMessage);
router.get("/inbox", auth, getMyMessages);
router.get("/sent", auth, getSentMessages);

module.exports = router;
