const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

if (!register || !login) {
  console.error('Missing required controller functions!');
}

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;