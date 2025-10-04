const express = require("express");
const router = express.Router();
const path = require("path");

// Root or index.html
router.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// New page
router.get(/^\/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

// Old page
router.get(/^\/old-page(.html)?/, (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default
});

module.exports = router;
