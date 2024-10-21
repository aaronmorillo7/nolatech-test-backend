const routes = require('express').Router();
const bodyParser = require('body-parser');

const authRoutes = require("./auth")
const employeeRoutes = require("./employee")
const evaluationRoutes = require("./evaluation")
const feedbackRoutes = require("./feedback")

const { validateAuth } = require("../validations/auth")

routes.use(bodyParser.json());

routes.use("/auth", authRoutes)

routes.use(validateAuth);

routes.use("/employees", employeeRoutes)
routes.use("/evaluations", evaluationRoutes)
routes.use("/feedback", feedbackRoutes)

module.exports = routes;