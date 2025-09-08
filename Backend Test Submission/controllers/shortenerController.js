const { log } = require("../../Logging Middleware/logMiddleware");
const { saveEntry, isCodeUsed, getStatsByCode } = require("../data/store");
const generateCode = require("../utils/generateShortcode");

function createShortUrl(req, res) {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== "string") {
    log("backend", "error", "handler", "Invalid URL input");
    return res.status(400).json({ error: "URL must be a valid string" });
  }

  const code = shortcode || generateCode();
  if (shortcode && isCodeUsed(shortcode)) {
    log("backend", "warn", "service", `Shortcode conflict: "${shortcode}"`);
    return res.status(409).json({ error: "Shortcode already taken" });
  }

  const expiry = new Date(Date.now() + validity * 60000).toISOString();
  saveEntry(code, url, expiry);

  log("backend", "info", "controller", `Short URL created with code "${code}"`);
  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry,
  });
}

function fetchStats(req, res) {
  const code = req.params.code;
  const stats = getStatsByCode(code);

  if (!stats) {
    log(
      "backend",
      "error",
      "repository",
      `Stats lookup failed for code "${code}"`
    );
    return res.status(404).json({ error: "Shortcode not found" });
  }

  log("backend", "info", "controller", `Stats retrieved for code "${code}"`);
  res.status(200).json(stats);
}

module.exports = { createShortUrl, fetchStats };
