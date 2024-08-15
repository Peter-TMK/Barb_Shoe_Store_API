const express = require("express");
const connectDB = require("./src/config/database");
const morgan = require("morgan");
const { register, login } = require("./src/controllers/auth.controller");
const authRouter = require("./src/routes/auth.routes");
const productRouter = require("./src/routes/product.routes");
const notificationRouter = require("./src/routes/notification.routes");
const userRouter = require("./src/routes/user.route");
const errorHandler = require("./src/config/errorHandler");
const limiter = require("./src/middleware/rateLimiter.middleware");

const app = express();
app.use(express.json());
// app.use(cookieParser());

connectDB();

app.use(limiter);

morgan.token("req-body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// Middleware for logging with custom format
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/products/notification", notificationRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);
module.exports = app;
