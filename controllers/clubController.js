// src/controllers/clubController.js
const Club = require('../models/club');

// GET all clubs
const getAllClubs = async (req, res, next) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    next(err);
  }
};

// GET single club
const getClubById = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.json(club);
  } catch (err) {
    next(err);
  }
};

// POST create club
const createClub = async (req, res, next) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    next(err);
  }
};

// PUT update club
const updateClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.json(club);
  } catch (err) {
    next(err);
  }
};

// DELETE club
const deleteClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.json({ message: "Club deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub };
