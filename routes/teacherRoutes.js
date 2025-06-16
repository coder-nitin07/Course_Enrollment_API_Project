const express = require('express');
const { onboardTeacher } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/authorizedRoles');
const teacherRouter = express.Router();

teacherRouter.post('/onboard', authMiddleware, authorizedRoles('Teacher'), onboardTeacher);

module.exports = { teacherRouter };