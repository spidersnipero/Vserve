const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = parseInt(process.env.AUTH_PORT) || 3002;

const signupRouter = require("./routes/auth/signup");
const signinRouter = require("./routes/auth/signin");
const tokenRouter = require("./routes/auth/token");
const signoutRouter = require("./routes/auth/signout");

const authenticateToken = require("./middleware/authenticate");
const connectToDB = require("./db/connect_to_db");

connectToDB("aj");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/auth/signup", signupRouter);
app.post("/auth/signin", signinRouter);
app.post("/auth/newtoken", tokenRouter);
app.delete("/auth/signout", authenticateToken, signoutRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
