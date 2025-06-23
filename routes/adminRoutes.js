const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const blacklistedToken = require('../middlewares/blacklistedToken');
const authorizedRoles = require('../middlewares/authorizedRoles');
const { addQualification, getAllQualification, updateQualification, deleteQualification, unenrollStudentByAdmin } = require('../controllers/adminController');
const { qualificationValidation, updateQualificationValidation } = require('../models/qualificationValidation');

const adminRouter = express.Router();

adminRouter.post('/addQualification', blacklistedToken, authMiddleware, authorizedRoles('ADMIN'), qualificationValidation, addQualification);
adminRouter.put('/updateQualification/:id', blacklistedToken, authMiddleware, authorizedRoles('ADMIN'), updateQualificationValidation, updateQualification);
adminRouter.delete('/deleteQualification/:id', blacklistedToken, authMiddleware, authorizedRoles('ADMIN'), deleteQualification);
adminRouter.get('/qualifications', getAllQualification);

// Unerolled student
adminRouter.put('/unenrollStudent1', blacklistedToken, authMiddleware, authorizedRoles('ADMIN'), unenrollStudentByAdmin);

module.exports = { adminRouter };