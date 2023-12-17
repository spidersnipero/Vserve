// a mongodb model for user with email and password

const mongoose = require("mongoose");
const UserWithEmailAndPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
  }
);

const UserWithEmailAndPassword = mongoose.model(
  "UserWithEmailAndPassword",
  UserWithEmailAndPasswordSchema
);

module.exports = UserWithEmailAndPassword;
