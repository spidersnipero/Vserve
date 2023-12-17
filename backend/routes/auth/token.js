const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const RefreshToken = require("../../models/refreshToken");

// Generate new access token
router.post("/auth/newtoken", async (req, res) => {
  const { userId, refreshToken } = req.body;

  if (refreshToken == null) return res.sendStatus(401);
  if (!process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "Refresh token secret is not defined in the environment variables."
    );
    process.exit(1);
  }
  // check if refresh token exists in the database
  const existRefreshToken = await RefreshToken.findOne({
    userId,
    refreshToken,
  });

  if (!existRefreshToken || JSON.stringify(existRefreshToken) == "{}")
    return res.sendStatus(403);
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { userId: user.userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate new access token" });
  }
});

module.exports = router;
