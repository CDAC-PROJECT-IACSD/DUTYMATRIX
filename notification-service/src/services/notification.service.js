const notificationStore = require("../data/notification.store");

// Create notification
exports.createNotification = (userId, message) => {
  const notification = {
    id: Date.now(),               
    userId: userId,
    message: message,
    createdAt: new Date(),
    read: false
  };

  notificationStore.push(notification);

  console.log("🔔 Notification Created:", notification);

  return notification;
};

// Get notifications for a user
exports.getNotificationsByUser = (userId) => {
  return notificationStore.filter(n => n.userId == userId);
};
