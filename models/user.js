/* ==================================================
src/models/User.js
================================================== */
const mongoose = require ('mongoose');


const { Schema } = mongoose;


const UserSchema = new Schema({
oauthProvider: { type: String },
oauthId: { type: String },
email: { type: String, required: true, unique: true },
name: { type: String },
role: { type: String, enum: ['student', 'officer', 'admin'], default: 'student' },
avatarUrl: { type: String },
createdAt: { type: Date, default: Date.now },
lastSeen: { type: Date }
});


module.exports = mongoose.model('User', UserSchema);