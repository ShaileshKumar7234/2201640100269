const fetch = require("node-fetch");
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFpbGVzaDg5NjBrdW1hckBnbWFpbC5jb20iLCJleHAiOjE3NTczMjM5ODMsImlhdCI6MTc1NzMyMzA4MywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjhiYzgwMzYyLTYyMmEtNGFmYy05NDBmLTY3NDhkZWI3ZWY0NCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlsZXNoIGt1bWFyIiwic3ViIjoiNTE1YTM3MGEtMGFiNS00OTk1LWJlNjYtZjJjNDFkOTNmMjU2In0sImVtYWlsIjoic2hhaWxlc2g4OTYwa3VtYXJAZ21haWwuY29tIiwibmFtZSI6InNoYWlsZXNoIGt1bWFyIiwicm9sbE5vIjoiMjIwMTY0MDEwMDI2OSIsImFjY2Vzc0NvZGUiOiJzQVdUdVIiLCJjbGllbnRJRCI6IjUxNWEzNzBhLTBhYjUtNDk5NS1iZTY2LWYyYzQxZDkzZjI1NiIsImNsaWVudFNlY3JldCI6IlRaQXlSVUN2dFVyeHJKV20ifQ.GxHGN0-CvNQkekM6J5DKUD7nRRRWdyiaufv0NJ9Gw60";

async function log(stack, level, pkg, message) {
  const allowedStack = "backend";
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const backendPackages = [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
    "auth",
    "config",
    "middleware",
    "utils",
  ];

  if (stack !== allowedStack) {
    console.error(`Invalid stack: "${stack}". Only "backend" is allowed.`);
    return;
  }

  if (!validLevels.includes(level)) {
    console.error(
      `Invalid level: "${level}". Choose from: ${validLevels.join(", ")}`
    );
    return;
  }

  if (!backendPackages.includes(pkg)) {
    console.error(`Invalid package "${pkg}" for backend stack.`);
    return;
  }

  const logData = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch(
      "http://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(logData),
      }
    );

    const result = await response.json();
    console.log(`Log sent: ${result.message} (ID: ${result.logID})`);
  } catch (err) {
    console.error("Logging failed:", err);
  }
}

module.exports = { log };
