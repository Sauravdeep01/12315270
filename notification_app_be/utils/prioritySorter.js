const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const sortNotifications = (notifications) => {
  return notifications
    .sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
};

module.exports = sortNotifications;