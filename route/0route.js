let express = require("express");
let controll = require("../controllers/controller");
let route = express.Router();

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Default route for API
 *     description: Returns a default message indicating the API is running
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Default message
 */
route.get('/', controll.defaults);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 description: Role of the user (e.g., student, teacher, admin)
 *     responses:
 *       200:
 *         description: User successfully registered
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
route.post('/register', controll.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
route.post('/login', controll.login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User successfully logged out
 */
route.get('/logout', controll.logout);

module.exports = route;
