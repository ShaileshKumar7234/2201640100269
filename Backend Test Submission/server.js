const express = require("express");
const shortUrlRouter = require("./routes/shorturls");
const { log } = require("../Logging Middleware/logMiddleware");
const { getEntryByCode } = require("./data/store");

const app = express();
app.use(express.json());
app.use("/shorturls", shortUrlRouter);

app.get("/:code", (req, res) => {
  const code = req.params.code;
  const entry = getEntryByCode(code);

  if (!entry) {
    log(
      "backend",
      "error",
      "route",
      `Redirection failed: unknown code "${code}"`
    );
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const now = Date.now();
  const expiryTime = new Date(entry.expiry).getTime();

  if (now > expiryTime) {
    log(
      "backend",
      "warn",
      "route",
      `Expired shortcode access attempt: "${code}"`
    );
    return res.status(410).json({ error: "Shortcode has expired" });
  }

  entry.clicks.push({
    time: new Date().toISOString(),
    source: req.get("Referer") || "direct",
    region: "IN",
  });

  log(
    "backend",
    "info",
    "route",
    `Redirecting to original URL for code "${code}"`
  );
  res.redirect(entry.url);
});

app.listen(3000, () => {
  console.log("URL Shortener service running on port 3000");
});
