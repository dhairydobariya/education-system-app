let usermodel = require('../models/usermodel');
require('dotenv').config(); // Load environment variables
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Default route
let defaults = (req, res) => {
    res.send("It's the default route for the Education Management API");
};

// User Registration
let register = async (req, res) => {
    let { name, password, email, role } = req.body;  // Accept role during registration
    if (!name || !password || !email ) {
        return res.status(400).json({ message: 'Name, password, email, and role are required' });
    }

    try {
        // Hash the password using bcrypt
        let hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        let userdata = new usermodel({
            name,
            password: hashedPassword,
            email,
            role : !role ? "student" : role 
        });

        // Save user data
        await userdata.save();
        res.json({ message: "User successfully registered" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User Login
let login = async (req, res) => {
    let { name, password } = req.body;
    
    try {
        // Check if user exists
        let user = await usermodel.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generate JWT token with role info
            const token = jwt.sign(
                { id: user._id, name: user.name, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Store token in cookies (secure and HTTP only)
            res.cookie('token', token, { httpOnly: true, secure: true });

            return res.json({ message: "User successfully logged in", token: token, role: user.role });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User Logout
let logout = (req, res) => {
    res.clearCookie('token');  // Clear JWT token from cookies
    res.json({ message: "User successfully logged out" });
};

// Middleware for role-based access control
const checkRole = (roles) => (req, res, next) => {
    const userRole = req.user.role;  // Assuming req.user is populated from JWT
    if (roles.includes(userRole)) {
        next();  // User has the required role, proceed to the next middleware
    } else {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
};

module.exports = {
    defaults,
    register,
    login,
    logout,
    checkRole  // Exporting the role-based middleware for use in routes
};
