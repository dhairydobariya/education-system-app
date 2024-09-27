let express = require("express");
let app = express();
let port = process.env.PORT || 4000;

let bodyparser = require('body-parser');
let cookieparser = require('cookie-parser');
let mongoose = require('./db/database');
let userRoutes = require('./route/0route');
let adminRoutes = require('./route/1adminRoutes');
let teacherRoutes = require('./route/2teacherRoutes');
let studentRoutes = require('./route/3studentRoutes');

let { authenticateUser } = require('./middleware/authMiddleware');
require('dotenv').config();

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

// API Endpoints
app.use('/auth', userRoutes);
app.use('/admin', authenticateUser, adminRoutes);
app.use('/teacher', authenticateUser, teacherRoutes);
app.use('/student', authenticateUser, studentRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server successfully running on port ${port}`);
});
