const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");

const secret = require("../config/secret");

const login = (request, response, next) => {
  const User = mongoose.model("User");

  User.findOne(
    {
      email: request.body.email,
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        return next({
          status: 400,
          message: "Authentication failed. User not found.",
        });
      }

      return bcrypt.compare(
        request.body.password,
        user.password,
        (error, result) => {
          if (result && !error) {
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
                expiresIn: "3h",
              }
            );

            return response.json({
              success: true,
              access_token: token,
              user: {
                _id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
              },
            });
          }

          return next({
            status: 401,
            message: "Authentication failed. Wrong password. Try again.",
          });
        }
      );
    }
  );
};

const register = (request, response, next) => {
  const UserModel = mongoose.model("User");

  const passwordHash = bcrypt.hashSync(request.body.password);

  const User = new UserModel({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    password: passwordHash,
  });

  UserModel.countDocuments({ email: request.body.email }, (err, count) => {
    if (count !== 0) {
      return next({
        status: 401,
        message: "Email is already taken by another user.",
      });
    }

    return User.save((saveErr) => {
      if (saveErr) {
        return next({
          status: 500,
          message: "Database error",
          error: [saveErr],
        });
      }

      return response.status(201).json({ success: true, message: "success" });
    });
  });
};

const resetPassword = (request, response) => {
  const user = {};

  response.status(200).json({ user });
};

module.exports = {
    login, 
    register, 
    resetPassword,
}
