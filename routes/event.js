const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const eventSchema = require("../validations/eventValidation");
const validate = require("../middleware/validate");
const {auth} = require("../middleware/auth");

// Protected routes (all require login)
router.get("/", auth, eventController.getAllEvents);
router.get("/:id", auth, eventController.getEventById);
router.post("/", auth, validate(eventSchema), eventController.createEvent);
router.put("/:id", auth, validate(eventSchema), eventController.updateEvent);
router.delete("/:id", auth, eventController.deleteEvent);

module.exports = router;
