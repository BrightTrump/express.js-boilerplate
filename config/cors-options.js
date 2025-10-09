const allowedOrigins = require("./allowed-origins");

const corsOptions = {
  origin: (origin, callback) => {
    allowedOrigins.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
};

module.export = corsOptions;
