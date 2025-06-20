const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const blacklistedToken = require('../middlewares/blacklistedToken');
const authorizedRoles = require('../middlewares/authorizedRoles');
const { onboardStudent, getStudentProfile, updateStudent, enrollStudent, getAllEnrolledCourse, unerollStudent } = require('../controllers/studentController');
const studentRouter = express.Router();

studentRouter.post('/onboard', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), onboardStudent);
studentRouter.get('/getStudentProfile', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), getStudentProfile);
studentRouter.put('/updateStudent', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), updateStudent);

// Enrollment API
studentRouter.post('/enroll/:courseId', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), enrollStudent);
studentRouter.get('/getAllEnrolledCourse', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), getAllEnrolledCourse);
studentRouter.delete('/unenroll/:courseId', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), unerollStudent);

module.exports = { studentRouter };