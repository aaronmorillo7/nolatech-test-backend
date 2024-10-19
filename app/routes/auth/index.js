const auth = require('express').Router();

const { login, register, resetPassword } = require("../../controllers/userController")

const { validateLogin, validateRegister } = require("../../validations/auth");

auth.post('/register', validateRegister, register);

auth.post('/login', validateLogin, login);

auth.get('/login', () => { console.log("Hello!") });

auth.post('/reset-password', resetPassword);

module.exports = auth;