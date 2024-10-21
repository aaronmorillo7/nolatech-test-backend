const Joi = require("joi");

const validateCreateEvaluation = async (request, response, next) => {
  const schema = Joi.object().keys({
    employee: Joi.string().required(),
    name: Joi.string().required(),
    questions: Joi.array().items({
      score: Joi.number().valid(1, 2, 3, 4, 5).required(),
      title: Joi.string().required(),
      suggestion: Joi.string(),
      category_name: Joi.string().required(),
    }),
  });

  const { error, value } = schema.validate({
    employee: request.body.employee,
    name: request.body.name,
    questions: request.body.questions,
  });

  if (error)
    return response.status(400).json({
      success: false,
      message: "Datos incorrectos.",
      error: error,
    });

  next();
};

const validateEditEvaluation = async (request, response, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    questions: Joi.array().items({
      score: Joi.number().valid(1, 2, 3, 4, 5).required(),
      title: Joi.string().required(),
      suggestion: Joi.string(),
      category_name: Joi.string().required(),
    }),
  });

  const { error, value } = schema.validate({
    name: request.body.name,
    questions: request.body.questions,
  });

  if (error)
    return response.status(400).json({
      success: false,
      message: "Datos incorrectos.",
      error: error,
    });

  next();
};

module.exports = {
  validateCreateEvaluation,
  validateEditEvaluation,
};
