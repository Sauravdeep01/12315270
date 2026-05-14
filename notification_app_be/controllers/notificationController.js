const fetchNotifications = require("../services/notificationService");
const sortNotifications = require("../utils/prioritySorter");

const getTopNotifications = async (req, res) => {
  try {
    const notifications = await fetchNotifications();

    const topNotifications = sortNotifications(notifications);

    res.status(200).json(topNotifications);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

module.exports = { getTopNotifications };