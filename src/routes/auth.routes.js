const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  validateRegisterMiddleWare,
} = require("../middleware/validator.middleware");
const authRouter = express.Router();

// Register route
authRouter.post("/register", validateRegisterMiddleWare, register);
authRouter.post("/login", login);

module.exports = authRouter;
