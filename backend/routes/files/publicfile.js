const express = require("express");
const router = express.Router();
const upload = require("../../middleware/filesort");
const File = require("../../models/file");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

router.post(
  "/file/upload",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    console.log(req.file);
    const file = new File({
      name: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      contentType: req.file.mimetype,
    });
    const savedFile = await file.save();
    res.send(savedFile);
  })
);

module.exports = router;
