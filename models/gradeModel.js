const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    grade: { type: String, required: true },
    assignmentGrades: [{  // Track assignment grades separately for more detailed grading info
        assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
        grade: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);
