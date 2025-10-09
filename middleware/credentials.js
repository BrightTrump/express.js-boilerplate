const allowedOrigins = require("./allowed-origins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Acces-Control-Allow_Credentials", true);
  }
  next();
};

module.export = credentials;
