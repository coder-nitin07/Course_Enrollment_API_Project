const express = require('express');
const authRouter = express.Router();
const { register } = require("../controllers/authController");
const { authValidation } = require('../models/authValidation');

authRouter.post('/register', authValidation, register);

module.exports = { authRouter };