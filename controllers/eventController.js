const Event = require('../models/event');

// GET all events
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('club').populate('attendees');
    res.json(events);
  } catch (err) { next(err); }
};

// GET single event
const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('club').populate('attendees');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) { next(err); }
};

// CREATE event
const createEvent = async (req, res, next) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) { next(err); }
};

// UPDATE event
const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) { next(err); }
};

// DELETE event
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) { next(err); }
};
module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};
