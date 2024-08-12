const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const authRouter = express.Router();

// Register route
authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
