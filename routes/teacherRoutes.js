const express = require('express');
const { onboardTeacher, createCourse, getAllCourseOfTeacher, updateCourse, deleteCourse, getAllCourse } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/authorizedRoles');
const blacklistedToken = require('../middlewares/blacklistedToken');
const teacherRouter = express.Router();

teacherRouter.post('/onboard', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), onboardTeacher);
teacherRouter.post('/createCourse', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), createCourse);
teacherRouter.put('/updateCourse/:id', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), updateCourse);
teacherRouter.delete('/deleteCourse/:id', blacklistedToken, authMiddleware, authorizedRoles('TEACHER'), deleteCourse);
teacherRouter.get('/getAllCourseOfTeacher', getAllCourseOfTeacher);
teacherRouter.get('/getAllCourse', getAllCourse);

module.exports = { teacherRouter };