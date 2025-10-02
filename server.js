const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// app.get("/", (req, res) => {
//   //res.sendFile("./views/index.html", { root: __dirname });
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// Root or index.html
app.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// New page
app.get(/^\/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// Old page
app.get(/^\/old-page(.html)?/, (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default
});

// Route handler
app.get(
  /^\/hello(.html)?/,
  (req, res, next) => {
    console.log("Attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// Chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("finished!");
};

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
