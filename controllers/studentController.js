const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');
const Assignment = require('../models/assignmentModel');

// Student: Enroll in a course
let enrollInCourse = async (req, res) => {
    try {
        const studentId = req.user.id; // Get the student ID from the token
        const courseId = req.params.courseId; // Get the course ID from the request parameters

        // Check if the student is already enrolled
        const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Student is already enrolled in this course." });
        }

        // Create a new enrollment record
        const enrollment = new Enrollment({ student: studentId, course: courseId });
        await enrollment.save();

        // Update the course with the student's enrollment
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: studentId } }, // Add the student to the course's student list (using $addToSet to avoid duplicates)
            { new: true } // Return the updated document
        );

        // Check if the course was found
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found." });
        }

        // Respond with success message and the enrollment details
        res.status(201).json({ message: "Enrolled successfully", enrollment, course: updatedCourse });
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ error: err.message });
    }
};



// Student: View enrolled courses
let getCourses = async (req, res) => {
    try {
        const studentId = req.user.id;

        const courses = await Enrollment.find({ student: studentId }).populate('course', 'title description'); // Populate specific fields
        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found for the student.' });
        }

        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching courses', message: err.message });
    }
};



// Student: View grades
let viewGrades = async (req, res) => {
    try {
        const studentId = req.user.id;

        const grades = await Enrollment.find({ student: studentId, grade: { $exists: true } })
            .populate('course', 'title') // Populate the course title
            .select('course grade'); // Select only course and grade fields

        if (!grades.length) {
            return res.status(404).json({ message: 'No grades found for the student.' });
        }

        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching grades', message: err.message });
    }
};


// Student: View All Assignments for a Course
const getStudentAssignments = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user.id; // Get the student ID from the authenticated user

    try {
        // Check if the student is enrolled in the course
        const isEnrolled = await Enrollment.findOne({ student: studentId, course: courseId });
        if (!isEnrolled) {
            return res.status(403).json({ message: 'You are not enrolled in this course.' });
        }

        // If enrolled, fetch assignments for the course
        const assignments = await Assignment.find({ courseId });

        if (!assignments.length) {
            return res.status(404).json({ message: 'No assignments found for this course.' });
        }

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignments', error: error.message });
    }
};

// Student: Submit Assignment
const submitAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const { fileUrl } = req.body; // Assume file URL is sent in the request

    try {
        // Find the assignment
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Check if the student is enrolled in the course associated with the assignment
        const isEnrolled = await Enrollment.findOne({
            student: req.user.id,
            course: assignment.courseId
        });
        if (!isEnrolled) {
            return res.status(403).json({ message: 'You are not enrolled in this course' });
        }

        // Add submission details to the assignment
        assignment.submissions.push({
            studentId: req.user.id,
            fileUrl,
            submissionDate: new Date()
        });

        await assignment.save();
        res.status(200).json({ message: 'Assignment submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting assignment', error: error.message });
    }
};








module.exports = {
    enrollInCourse,
    getCourses,
    viewGrades,
    submitAssignment,
    getStudentAssignments
}