const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const blacklistedToken = require('../middlewares/blacklistedToken');
const authorizedRoles = require('../middlewares/authorizedRoles');
const { addQualification } = require('../controllers/adminController');
const adminRouter = express.Router();

adminRouter.post('/addQualification', blacklistedToken, authMiddleware, authorizedRoles('ADMIN'), addQualification);

module.exports = { adminRouter };