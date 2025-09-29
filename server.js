const express = require("express");
const app = express();
// const server = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("./views/index.html", { root: _dirname });
});
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
