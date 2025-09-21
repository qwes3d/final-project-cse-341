/* ==================================================
src/models/Event.js
================================================== */
const mongoose = require  ('mongoose');
const { Schema } = mongoose;


const EventSchema = new Schema({
clubId: { type: Schema.Types.ObjectId, ref: 'Club' },
title: { type: String, required: true },
description: String,
location: String,
startTime: Date,
endTime: Date,
capacity: Number,
attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
isCancelled: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('Event', EventSchema);