const express = require('express');
const authRouter = express.Router();
const { register, login } = require("../controllers/authController");
const { authValidation } = require('../models/authValidation');
const { loginValidation } = require('../models/loginValidation');

authRouter.post('/register', authValidation, register);
authRouter.post('/login', loginValidation, login);

module.exports = { authRouter };