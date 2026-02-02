const notificationService = require("../services/notification.service");

// POST → create notification
const sendNotification = (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res
      .status(400)
      .json({ error: "userId and message are required" });
  }

  const notification = notificationService.createNotification(userId, message);
  res.status(201).json(notification);
};

// GET → fetch notifications for a user
const getUserNotifications = (req, res) => {
  const { userId } = req.params;

  const notifications =
    notificationService.getNotificationsByUser(userId);

  res.json(notifications);
};

// ✅ THIS EXPORT IS CRITICAL
module.exports = {
  sendNotification,
  getUserNotifications,
};
