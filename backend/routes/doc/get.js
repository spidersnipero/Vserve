const express = require("express");
const router = express.Router();
const createGenericModel = require("../../models/genericModel");
const authenticateToken = require("../../middleware/authenticate.js");

router.post("/getData", authenticateToken, (req, res) => {
  const database = req.body.database;
  const query = req.body.query;

  try {
    if (database === undefined) {
      throw new Error("Database can not be undefined");
    }
    if (database === "") {
      throw new Error("Database can not be empty");
    }
    if (query === undefined) {
      throw new Error("Query can not be undefined");
    }
    if (JSON.stringify(query) === "{}") {
      throw new Error("Query can not be empty");
    }

    const newDocument = createGenericModel(database);
    newDocument
      .find(query)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json({ Error: err.message });
      });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

module.exports = router;
