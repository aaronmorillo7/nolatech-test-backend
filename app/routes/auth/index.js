const auth = require('express').Router();

const { login, register } = require("../../controllers/userController")

const { validateLogin, validateRegister } = require("../../validations/auth");

auth.post('/register', validateRegister, register);

auth.post('/login', validateLogin, login);

module.exports = auth;