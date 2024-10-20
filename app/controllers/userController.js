const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");

const secret = require("../config/secret");

const { UserModel, getUserRolesByName } = require("../models/User");
const EmployeeModel = require("../models/Employee");

const login = async (request, response) => {
  let user = null;

  try {
    user = await UserModel.findOne({
      email: request.body.email,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "Usuario no encontrado.",
    });
  }

  if (!user)
    return response.status(400).json({
      success: false,
      message: "Usuario no encontrado.",
    });

  bcrypt.compare(request.body.password, user.password, (error, result) => {
    if (!result || error)
      return response.status(401).json({
        status: 401,
        message: "Contraseña incorrecta",
      });

    const dataUser = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(
      {
        user: dataUser,
      },
      secret,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME || "3h",
      }
    );

    return response.status(200).json({
      success: true,
      access_token: token,
      user: {
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        genre: user.genre,
        age: user.age,
      },
    });
  });
};

const register = async (request, response) => {
  const hashedPassword = bcrypt.hashSync(request.body.password);

  try {
    const User = new UserModel({
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      age: request.body.age,
      password: hashedPassword,
      role: request.body.role,
    });

    const userCount = await UserModel.countDocuments({
      email: request.body.email,
    });

    if (userCount)
      return response.status(401).json({
        success: false,
        message: "El email ya está en uso.",
      });

    await User.save();

    if (User.role === getUserRolesByName("EMPLOYEE")) {
      const newEmployee = new EmployeeModel({
        department: request.body.department,
        user: User.id,
      });

      await newEmployee.save();
    }

    return response.status(201).json({ success: true, message: "success" });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.details,
    });
  }
};

module.exports = {
  login,
  register,
};
