const express = require("express");
const notificationRouter = express.Router();
const getNotifications = require("../controllers/notification.controller");

const authenticate = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

notificationRouter.get("/", getNotifications);

module.exports = notificationRouter;
