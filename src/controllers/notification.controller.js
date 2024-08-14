const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const notificationModel = require("../models/notification.model");

////////////// PENDING BELOW ////////////////////////////////
const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
////////////// PENDING ABOVE ////////////////////////////////

module.exports = getNotifications;
