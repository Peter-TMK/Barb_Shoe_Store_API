const express = require("express");
const connectDB = require("./src/config/database");
const authRouter = require("./src/routes/auth.routes");
const { register, login } = require("./src/controllers/auth.controller");

const app = express();
app.use(express.json());
// app.use(cookieParser());
connectDB();

app.use("/api/auth", authRouter);

module.exports = app;
