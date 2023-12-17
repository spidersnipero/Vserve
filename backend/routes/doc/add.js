const express = require("express");
const router = express.Router();
const createGenericModel = require("../../models/genericModel");
const authenticateToken = require("../../middleware/authenticate");

router.post("/setData", authenticateToken, async (req, res) => {
  const database = req.body.database;
  const jsonDocument = req.body.jsonDocument.jsonData;

  // Create a new instance of the model with the JSON data
  try {
    if (database === undefined || jsonDocument === undefined) {
      throw new Error("Doc or Database can not be undefined");
    }
    if (database === "" || JSON.stringify(jsonDocument) === "{}") {
      throw new Error("Doc or Database can not be empty");
    }
    const newDocument = createGenericModel(database)(jsonDocument);
    await newDocument.save();
    res.json(newDocument);
  } catch {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = router;
