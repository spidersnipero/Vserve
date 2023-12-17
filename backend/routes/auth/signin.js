const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserWithEmailAndPassword = require("../../models/userWithEmailAndPassword");
const RefreshToken = require("../../models/refreshToken");

router.post("/auth/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ Error: "Email or password cannot be empty" });
  }
  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error(
      "Access token secret is not defined in the environment variables."
    );
    process.exit(1);
  }

  try {
    // Check if user exists
    const existUser = await UserWithEmailAndPassword.findOne({ email: email });

    if (!existUser) {
      return res.status(400).json({ Error: "User does not exist" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existUser.password);

    if (passwordMatch) {
      const user = {
        id: existUser._id,
      };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      });
      const existingRefreshToken = await RefreshToken.findOne({
        userId: existUser._id,
      });
      if (!existingRefreshToken) {
        const newRefreshToken = new RefreshToken({
          refreshToken: jwt.sign(user, process.env.REFRESH_TOKEN_SECRET),
          userId: existUser._id,
        });
        await newRefreshToken.save();
        return res.json({
          accessToken: accessToken,
          userId: existUser._id,
          refreshToken: newRefreshToken.refreshToken,
        });
      }
      return res.json({
        accessToken: accessToken,
        userId: existUser._id,
        refreshToken: existingRefreshToken.refreshToken,
      });
    } else {
      return res.status(400).json({ Error: "Wrong password" });
    }
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
});

module.exports = router;
