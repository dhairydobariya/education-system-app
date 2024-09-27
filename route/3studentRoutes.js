const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

// Authentication and role middleware
router.use(authenticateUser);
router.use(authorizeRoles(['student']));

// Enrollment and course interaction
/**
 * @swagger
 * /students/courses:
 *   get:
 *     summary: Get all courses for the student
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Student
 *     responses:
 *       200:
 *         description: List of courses the student is enrolled in
 *       404:
 *         description: No courses found
 */
router.get('/courses', studentController.getCourses);

/**
 * @swagger
 * /students/courses/{courseId}/enroll:
 *   post:
 *     summary: Enroll in a specific course
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully enrolled in course
 *       400:
 *         description: Student is already enrolled
 */
router.post('/courses/:courseId/enroll', studentController.enrollInCourse);

/**
 * @swagger
 * /students/grades:
 *   get:
 *     summary: View student's grades
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Student
 *     responses:
 *       200:
 *         description: Grades for the student
 *       404:
 *         description: No grades found
 */
router.get('/grades', studentController.viewGrades);

/**
 * @swagger
 * /students/courses/{courseId}/assignments:
 *   get:
 *     summary: Get assignments for a specific course
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of assignments for the course
 *       404:
 *         description: No assignments found
 */
router.get('/courses/:courseId/assignments', studentController.getStudentAssignments);

/**
 * @swagger
 * /students/assignments/{assignmentId}/submit:
 *   post:
 *     summary: Submit an assignment
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileUrl:
 *                 type: string
 *                 description: URL of the submitted file
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 *       404:
 *         description: Assignment not found
 */
router.post('/assignments/:assignmentId/submit', studentController.submitAssignment);

module.exports = router;


module.exports = router;
