const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const corsOptions = require("./config/cors-options");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// Custom middleware
app.use(logger);

//Cross Origin Resources Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded formData
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

//Serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

// app.get("/", (req, res) => {
//   //res.sendFile("./views/index.html", { root: __dirname });
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// // Route handler
// app.get(
//   /^\/hello(.html)?/,
//   (req, res, next) => {
//     console.log("Attempted to load hello.html");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello World!");
//   }
// );

// // Chaining route handlers
// const one = (req, res, next) => {
//   console.log("one");
//   next();
// };
// const two = (req, res, next) => {
//   console.log("two");
//   next();
// };
// const three = (req, res, next) => {
//   console.log("three");
//   res.send("finished!");
// };

// app.get(/^\/chain(.html)?/, [one, two, three]);

// 404 page  Note: (app.use doesn't accept regex)
// app.all("*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });
app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
