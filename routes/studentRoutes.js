const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const blacklistedToken = require('../middlewares/blacklistedToken');
const authorizedRoles = require('../middlewares/authorizedRoles');
const { onboardStudent, getStudentProfile } = require('../controllers/studentController');
const studentRouter = express.Router();

studentRouter.post('/onboard', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), onboardStudent);
studentRouter.get('/getStudentProfile', blacklistedToken, authMiddleware, authorizedRoles('STUDENT'), getStudentProfile);

module.exports = { studentRouter };