const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.FILE_PORT || 3003;
const cors = require("cors");
const path = require("path");
const connectToDB = require("./db/connect_to_db");
connectToDB("aj");

const publicFileRouter = require("./routes/files/publicfile");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/file", express.static(path.join(__dirname, "storage")));

app.post("/file/upload", publicFileRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
