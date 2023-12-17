const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 3001;
dotenv.config();

const authenticateToken = require("./middleware/authenticate");

const addRouter = require("./routes/doc/add");
const getRouter = require("./routes/doc/get");
const connectToDB = require("./db/connect_to_db");

connectToDB("aj");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/setData", authenticateToken, addRouter);
app.post("/getData", authenticateToken, getRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
