const routes = require('express').Router();

const { getEvaluationsByEmployee, getEvaluation, createEvaluation, editEvaluation } = require("../../controllers/evaluationController")

const { validateCreateEvaluation, validateEditEvaluation } = require("../../validations/evaluation");

routes.get('/employee/:id', getEvaluationsByEmployee);

routes.get('/:id', getEvaluation);

routes.post('/', validateCreateEvaluation, createEvaluation);

routes.put('/:id', validateEditEvaluation, editEvaluation);

module.exports = routes;