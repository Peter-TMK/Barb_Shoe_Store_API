const express = require("express");
const connectDB = require("./src/config/database");
const { register, login } = require("./src/controllers/auth.controller");
const authRouter = require("./src/routes/auth.routes");
const productRouter = require("./src/routes/product.routes");
const notificationRouter = require("./src/routes/notification.routes");
const userRouter = require("./src/routes/user.route");

const app = express();
app.use(express.json());
// app.use(cookieParser());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/products/notification", notificationRouter);
app.use("/api/user", userRouter);

module.exports = app;
