const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

// Authentication and role middleware
router.use(authenticateUser);
router.use(authorizeRoles(['admin']));

// Course management

/**
 * @swagger
 * /admin/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               teacher:
 *                 type: string
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 *       500:
 *         description: Server error
 */
router.post('/courses', adminController.createCourse);

/**
 * @swagger
 * /admin/courses/{courseId}:
 *   put:
 *     summary: Update a course
 *     tags: [Admin]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               teacher:
 *                 type: string
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.put('/courses/:courseId', adminController.updateCourse);

/**
 * @swagger
 * /admin/courses/{courseId}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Admin]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.delete('/courses/:courseId', adminController.deleteCourse);

/**
 * @swagger
 * /admin/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Server error
 */
router.get('/courses', adminController.getAllCourses);

// Enrollment management

/**
 * @swagger
 * /admin/courses/{courseId}/enroll:
 *   post:
 *     summary: Enroll students in a course
 *     tags: [Admin]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course to enroll students in
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Students enrolled successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.post('/courses/:courseId/enroll', adminController.enrollStudent);

/**
 * @swagger
 * /admin/courses/{courseId}/unenroll:
 *   delete:
 *     summary: Unenroll a student from a course
 *     tags: [Admin]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course to unenroll the student from
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student unenrolled successfully
 *       404:
 *         description: Course not found or student not enrolled
 *       500:
 *         description: Server error
 */
router.delete('/courses/:courseId/unenroll', adminController.unenrollStudent);

module.exports = router;
