const express = require("express");
const router = express.Router();
const RefreshToken = require("../../models/refreshToken");
const authenticateToken = require("../../middleware/authenticate.js");

router.delete("/auth/signout", authenticateToken, async (req, res) => {
  const { userId, refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);
  try {
    await RefreshToken.findOneAndDelete({ userId, refreshToken });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to sign out" });
  }
});

module.exports = router;
