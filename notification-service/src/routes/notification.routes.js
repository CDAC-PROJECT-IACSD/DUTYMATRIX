const express = require("express");
const router = express.Router();

const notificationController =
  require("../controllers/notification.controller");

// These must EXIST in controller
router.post("/send", notificationController.sendNotification);
router.get(
  "/user/:userId",
  notificationController.getUserNotifications
);

module.exports = router;
