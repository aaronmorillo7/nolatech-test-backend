const routes = require('express').Router();

const { getEmployees } = require("../../controllers/employeeController")

routes.get('/', getEmployees);

module.exports = routes;