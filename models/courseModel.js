const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }] // References to Assignment Model
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
