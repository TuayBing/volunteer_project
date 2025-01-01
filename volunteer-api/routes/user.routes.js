const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const facultyController = require('../controllers/faculty.controller');

if (!register || !login) {
 console.error('Missing required controller functions!');
}

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile); 

// Faculty routes
router.get('/faculties', facultyController.getAllFaculties);
router.get('/faculties/:facultyId/majors', facultyController.getMajorsByFaculty);

module.exports = router;