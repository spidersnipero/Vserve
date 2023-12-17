const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  size: Number,
  path: String,
  uploadDate: { type: Date, default: Date.now },
  // Add other metadata fields if needed
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
