const routes = require('express').Router();

const { createFeedback } = require("../../controllers/feedbackController")

const { validateCreateFeedback } = require("../../validations/feedback");

routes.post('/', validateCreateFeedback, createFeedback);

module.exports = routes;