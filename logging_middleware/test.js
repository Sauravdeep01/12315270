const Log = require("./logger");

async function runTest() {
  console.log("Testing started");

  await Log(
    "backend",
    "error",
    "handler",
    "received string, expected bool"
  );

  console.log("Testing finished");
}

runTest();