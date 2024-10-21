const Joi = require("joi");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const { UserModel } = require("../../models/User");

const validateRegister = (request, response, next) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    genre: Joi.string().valid("F", "M").required(),
  });

  const { error, value } = schema.validate({
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password,
    age: request.body.age,
    genre: request.body.genre,
  });

  if (error)
    return response.status(400).json({
      success: false,
      message: "Datos incorrectos.",
      error: error,
    });
  else next();
};

const validateLogin = async (request, response, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate({
    email: request.body.email,
    password: request.body.password,
  });

  if (error)
    return response.status(400).json({
      success: false,
      message: "Datos incorrectos.",
      error: error,
    });
  else next();
};

const validateCheckToken = async (request, response, next) => {
  const schema = Joi.object().keys({
    access_token: Joi.string().required(),
  });

  const { error, value } = schema.validate({
    access_token: request.body.access_token,
  });

  if (error)
    return response.status(400).json({
      success: false,
      message: "Datos incorrectos.",
      error: error,
    });
  else next();
};

const validateAuth = async (request, response, next) => {
  const schema = Joi.object().keys({
    access_token: Joi.string().required(),
  });

  const { error, value } = schema.validate({
    access_token: request.headers.authorization?.split(" ")[1],
  });

  if (error)
    return response.status(401).json({
      success: false,
      error: error.details,
    });

  try {
    decoded = jwt.verify(request.headers.authorization?.split(" ")[1], secret);
  } catch (verificationError) {
    return response.status(401).json({
      success: false,
      must_logout: true,
      message: "Error de token.",
      error: verificationError.details,
    });
  }

  const user = await UserModel.findById(decoded.user.id);

  if (!user)
    return response.status(401).json({
      message:
        "La sesión es inválida. Por favor, intenta iniciar sesión de nuevo.",
      success: false,
      must_logout: true,
      error: [],
    });

  request.user = user;
  next();
};

module.exports = {
  validateLogin,
  validateRegister,
  validateCheckToken,
  validateAuth,
};
