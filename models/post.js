/* ==================================================
src/models/Post.js
================================================== */
const mongoose = require ( 'mongoose');
const { Schema: Sch } = mongoose;


const PostSchema = new Sch({
authorId: { type: Sch.Types.ObjectId, ref: 'User', required: true },
clubId: { type: Sch.Types.ObjectId, ref: 'Club' },
title: { type: String, required: true },
body: { type: String },
resourceUrl: { type: String },
attachments: [{ filename: String, url: String }],
tags: [String],
likes: [{ type: Sch.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });


module.exports = mongoose.model('Post', PostSchema);