const axios = require("axios");
require("dotenv").config();

const Log = async (stack, level, packageName, message) => {
  console.log("Logger started");

  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: packageName,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );

    console.log("SUCCESS");
    console.log(response.data);

  } catch (error) {
    console.log("ERROR OCCURRED");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

module.exports = Log;