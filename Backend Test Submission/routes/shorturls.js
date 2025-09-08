const express = require("express");
const {
  createShortUrl,
  fetchStats,
} = require("../controllers/shortenerController");

const router = express.Router();
router.post("/", createShortUrl);
router.get("/:code", fetchStats);

module.exports = router;
