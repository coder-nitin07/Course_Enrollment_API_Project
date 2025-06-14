const express = require('express');
const authRouter = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { authValidation } = require('../models/authValidation');
const { loginValidation } = require('../models/loginValidation');
const blacklistedToken = require('../middlewares/blacklistedToken');

authRouter.post('/register', authValidation, register);
authRouter.post('/login', loginValidation, login);
authRouter.post('/logout', blacklistedToken, logout);

module.exports = { authRouter };