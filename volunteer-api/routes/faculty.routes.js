const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');

router.get('/', facultyController.getAllFaculties);
router.get('/:facultyId/majors', facultyController.getMajorsByFaculty);

module.exports = router;