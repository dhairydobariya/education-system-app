const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

// Authentication and role middleware
router.use(authenticateUser);
router.use(authorizeRoles(['teacher', 'admin']));

/**
 * @swagger
 * /teachers/courses/{courseId}/content:
 *   put:
 *     summary: Update course content
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *       - in: body
 *         name: content
 *         required: true
 *         description: The updated course content (title, description, topics)
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             topics:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: The course content was updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Course not found
 */
router.put('/courses/:courseId/content', teacherController.updateCourseContent);

/**
 * @swagger
 * /teachers/courses/{courseId}/grade:
 *   post:
 *     summary: Assign grade to student
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *       - in: body
 *         name: grade
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             studentId:
 *               type: string
 *               description: The ID of the student
 *             grade:
 *               type: number
 *               description: The grade assigned to the student
 *     responses:
 *       200:
 *         description: Grade assigned successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Student or course not found
 */
router.post('/courses/:courseId/grade', teacherController.assignGrade);

/**
 * @swagger
 * /teachers/courses/{courseId}/analytics:
 *   get:
 *     summary: Get course analytics
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *       404:
 *         description: Course or analytics not found
 */
router.get('/courses/:courseId/analytics', teacherController.getCourseAnalytics);

/**
 * @swagger
 * /teachers/courses/{courseId}/assignments:
 *   post:
 *     summary: Create an assignment for the course
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *       - in: body
 *         name: assignment
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             dueDate:
 *               type: string
 *               format: date
 *         description: Assignment details
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Course not found
 */
router.post('/courses/:courseId/assignments', teacherController.createAssignment);

/**
 * @swagger
 * /teachers/assignments/{assignmentId}:
 *   put:
 *     summary: Update an assignment
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assignment
 *       - in: body
 *         name: assignment
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             dueDate:
 *               type: string
 *               format: date
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 */
router.put('/assignments/:assignmentId', teacherController.updateAssignment);

/**
 * @swagger
 * /teachers/assignments/{assignmentId}:
 *   delete:
 *     summary: Delete an assignment
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assignment
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 */
router.delete('/assignments/:assignmentId', teacherController.deleteAssignment);

/**
 * @swagger
 * /teachers/assignments/{assignmentId}/grade:
 *   post:
 *     summary: Grade an assignment submission
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assignment
 *       - in: body
 *         name: grade
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             studentId:
 *               type: string
 *             grade:
 *               type: number
 *     responses:
 *       200:
 *         description: Grade assigned successfully
 *       404:
 *         description: Assignment or submission not found
 */
router.post('/assignments/:assignmentId/grade', teacherController.gradeAssignment);

module.exports = router;
