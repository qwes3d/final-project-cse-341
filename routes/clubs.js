const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController.js");
const clubSchema = require("../validations/clubValidation");
const validate = require("../middleware/validate");
const {auth} = require("../middleware/auth");

router.get("/", auth, clubController.getAllClubs);
router.get("/:id", auth, clubController.getClubById);
router.post("/", auth, validate(clubSchema), clubController.createClub);
router.put("/:id", auth, validate(clubSchema), clubController.updateClub);
router.delete("/:id", auth, clubController.deleteClub);

module.exports = router;
