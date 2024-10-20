const mongoose = require("mongoose");

const UserRoles = [
  {
    name: "ADMIN",
    value: 1,
  },
  {
    name: "MANAGER",
    value: 2,
  },
  {
    name: "EMPLOYEE",
    value: 3,
  },
];

const getUserRolesByName = (name) => UserRoles.find((role) => role.name == name).value

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Es obligatorio"],
    },
    last_name: {
      type: String,
      required: [true, "Es obligatorio"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Es obligatorio"],
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Es obligatorio"],
    },
    age: Number,
    genre: {
      type: String,
      enum: ["M", "F"],
    },
    role: {
      type: Number,
      enum: [
        getUserRolesByName("ADMIN"), 
        getUserRolesByName("MANAGER"),
        getUserRolesByName("EMPLOYEE")
    ],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema)

module.exports = { UserModel, UserRoles, getUserRolesByName };
