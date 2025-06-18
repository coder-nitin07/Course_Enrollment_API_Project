const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const blacklistedToken = require('../middlewares/blacklistedToken');
const authorizedRoles = require('../middlewares/authorizedRoles');
const { addQualification, getAllQualification } = require('../controllers/adminController');
const { qualificationValidation } = require('../models/qualificationValidation');
const adminRouter = express.Router();

adminRouter.post('/addQualification', blacklistedToken, authMiddleware, authorizedRoles('ADMIN'), qualificationValidation, addQualification);
adminRouter.get('/qualifications', getAllQualification);

module.exports = { adminRouter };