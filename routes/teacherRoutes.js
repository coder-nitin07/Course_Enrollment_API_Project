const express = require('express');
const { onboardTeacher, createCourse, getAllCourseOfTeacher } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/authorizedRoles');
const blacklistedToken = require('../middlewares/blacklistedToken');
const teacherRouter = express.Router();

teacherRouter.post('/onboard', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), onboardTeacher);
teacherRouter.post('/createCourse', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), createCourse);
teacherRouter.get('/getAllCourseOfTeacher', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), getAllCourseOfTeacher);

module.exports = { teacherRouter };