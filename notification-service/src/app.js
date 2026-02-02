const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const notificationRoutes = require("./routes/notification.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Correct route mount
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Notification Service is running 🚀");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);
});
