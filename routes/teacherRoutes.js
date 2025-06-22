const express = require('express');
const { onboardTeacher, createCourse, getAllCourseOfTeacher, updateCourse, deleteCourse, getAllCourse, unenrollStudent } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/authorizedRoles');
const blacklistedToken = require('../middlewares/blacklistedToken');
const teacherRouter = express.Router();

teacherRouter.post('/onboard', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), onboardTeacher);
teacherRouter.post('/createCourse', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), createCourse);
teacherRouter.put('/updateCourse/:id', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), updateCourse);
teacherRouter.delete('/deleteCourse/:id', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), deleteCourse);

// Get Course
teacherRouter.get('/getAllCourseOfTeacher/:teacherId', getAllCourseOfTeacher);
teacherRouter.get('/getAllCourse', getAllCourse);

// Unenroll student
teacherRouter.post('/unenrollStudent', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), unenrollStudent);

module.exports = { teacherRouter };