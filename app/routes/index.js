const routes = require('express').Router();
const bodyParser = require('body-parser');

const authRoutes = require("./auth")
const employeeRoutes = require("./employee")

const { validateAuth } = require("../validations/auth")

routes.use(bodyParser.json());

routes.use("/auth", authRoutes)

routes.use(validateAuth);

routes.use("/employees", employeeRoutes)

module.exports = routes;