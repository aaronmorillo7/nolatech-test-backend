const auth = require('express').Router();

const { login, register, checkToken } = require("../../controllers/userController")

const { validateLogin, validateRegister, validateCheckToken } = require("../../validations/auth");

auth.post('/register', validateRegister, register);

auth.post('/login', validateLogin, login);

auth.post("/check-token", validateCheckToken, checkToken)

module.exports = auth;