/* ==================================================
src/models/Club.js (>=7 fields)
================================================== */
const mongoose = require ( 'mongoose');
const { Schema: S } = mongoose;


const OfficerSub = new S({ userId: { type: S.Types.ObjectId, ref: 'User' }, position: String }, { _id: false });


const ClubSchema = new S({
name: { type: String, required: true },
shortCode: { type: String, required: true, unique: true },
description: { type: String },
category: { type: String },
members: [{ type: S.Types.ObjectId, ref: 'User' }],
officers: [OfficerSub],
createdBy: { type: S.Types.ObjectId, ref: 'User' },
logoUrl: { type: String },
tags: [String],
foundedAt: { type: Date },
isActive: { type: Boolean, default: true },
meetingSchedule: { type: S.Types.Mixed }
}, { timestamps: true });


module.export = mongoose.model('Club', ClubSchema);