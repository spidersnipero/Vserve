const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const UserWithEmailAndPassword = require("../../models/userWithEmailAndPassword");
const RefreshToken = require("../../models/refreshToken");

router.post("/auth/signup", async (req, res) => {
  try {
    if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) {
      console.error(
        "Refresh token secret is not defined in the environment variables."
      );
      process.exit(1);
    }
    const { email, password } = req.body;
    const saltRounds = 10;

    if (!email || !password) {
      return res
        .status(400)
        .json({ Error: "Email or password cannot be empty" });
    }

    const existingUser = await UserWithEmailAndPassword.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ Error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new UserWithEmailAndPassword({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const user = { userId: newUser._id };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    const newRefreshToken = new RefreshToken({
      refreshToken: refreshToken,
      userId: newUser._id,
    });
    if (!newUser._id) {
      console.log("newUser._id is undefined");
    }
    await newRefreshToken.save();
    return res.json({
      userId: newUser._id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
});

module.exports = router;
