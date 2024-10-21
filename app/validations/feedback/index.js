const Joi = require("joi");

const validateCreateFeedback = async (request, response, next) => {
  const schema = Joi.object().keys({
    evaluation: Joi.string().required(),
    text: Joi.string().required(),
    score: Joi.number().valid(1, 2, 3, 4, 5).required(),
  });

  const { error, value } = schema.validate({
    evaluation: request.body.evaluation,
    text: request.body.text,
    score: request.body.score,
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
  validateCreateFeedback,
};
