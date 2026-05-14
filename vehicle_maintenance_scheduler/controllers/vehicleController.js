const axios = require("axios");
require("dotenv").config();

const scheduleVehicles = async (req, res) => {
  try {

    // FETCH DEPOTS
    const depotResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    // FETCH VEHICLES
    const vehicleResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    const depots = depotResponse.data.depots;
    const vehicles = vehicleResponse.data.vehicles;

    const results = [];

    // APPLY KNAPSACK
    for (const depot of depots) {

      const maxHours = depot.MechanicHours;

      const selected = knapsack(vehicles, maxHours);

      results.push({
        depotId: depot.ID,
        mechanicHours: maxHours,
        selectedVehicles: selected,
      });
    }

    res.json(results);

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      message: "Error occurred",
    });
  }
};



// KNAPSACK FUNCTION
function knapsack(tasks, maxHours) {

  const n = tasks.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(maxHours + 1).fill(0));

  for (let i = 1; i <= n; i++) {

    const duration = tasks[i - 1].Duration;
    const impact = tasks[i - 1].Impact;

    for (let w = 0; w <= maxHours; w++) {

      if (duration <= w) {

        dp[i][w] = Math.max(
          impact + dp[i - 1][w - duration],
          dp[i - 1][w]
        );

      } else {

        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // BACKTRACK
  let w = maxHours;

  const selected = [];

  for (let i = n; i > 0; i--) {

    if (dp[i][w] !== dp[i - 1][w]) {

      selected.push(tasks[i - 1]);

      w -= tasks[i - 1].Duration;
    }
  }

  return selected;
}

module.exports = {
  scheduleVehicles,
};