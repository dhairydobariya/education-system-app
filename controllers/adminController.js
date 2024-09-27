const Course = require('../models/courseModel');
const Enrollment = require('../models/enrollmentModel');
const User = require('../models/usermodel');

// Admin: Create a course
let createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

let getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name'); // Populating teacher field to get the teacher's name
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin: Update a course
let updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin: Delete a course
let deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.status(200).json({ message: 'Course deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



let enrollStudent = async (req, res) => {
    try {
        const { studentIds } = req.body; // Handle multiple student IDs
        const courseId = req.params.courseId;

        // Ensure studentIds is an array; if a single ID is passed, wrap it in an array
        const idsToEnroll = Array.isArray(studentIds) ? studentIds : [studentIds];

        // Array to hold enrollment results or errors
        const results = [];

        // Find the course to update later
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Loop through student IDs
        for (const studentId of idsToEnroll) {
            const student = await User.findById(studentId);
            if (!student || student.role !== 'student') {
                results.push({ studentId, message: 'Student not found or not a student role.' });
                continue; // Skip to the next ID if the student is not found or not a student
            }

            // Check if the student is already enrolled in the course
            const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
            if (existingEnrollment) {
                results.push({ studentId, message: 'Student is already enrolled in this course.' });
                continue; // Skip to the next studentId if the student is already enrolled
            }

            // Create a new enrollment record
            const enrollment = new Enrollment({ student: studentId, course: courseId });
            await enrollment.save();

            // Add student to the course's students array
            if (!course.students.includes(studentId)) {
                course.students.push(studentId);
            }
            results.push({ studentId, message: 'Enrollment successful.', enrollment });
        }

        // Save the updated course document
        await course.save();

        res.status(201).json({ results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




let unenrollStudent = async (req, res) => {
    try {
        const { studentId } = req.body; // Expecting studentId in the request body
        const courseId = req.params.courseId;

        // Find the course to update
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Check if the student is enrolled in the course
        if (!course.students.includes(studentId)) {
            return res.status(404).json({ message: 'Student is not enrolled in this course.' });
        }

        // Remove student ID from the course's students array
        course.students = course.students.filter(id => id.toString() !== studentId);

        // Save the updated course document
        await course.save();

        // Remove the enrollment record from the Enrollment model
        await Enrollment.findOneAndDelete({ student: studentId, course: courseId });

        res.status(200).json({ message: 'Student unenrolled successfully from the course.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    enrollStudent,
    unenrollStudent

}

