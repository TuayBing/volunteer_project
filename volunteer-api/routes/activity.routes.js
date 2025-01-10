const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const activitiesController = require('../controllers/activities.controller');

router.get('/', activitiesController.getActivities);
router.post('/register', activitiesController.registerActivities);
router.get('/user/:userId', verifyToken, activitiesController.getUserActivities);
router.put('/:id/status', activitiesController.updateActivityStatus);
router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;