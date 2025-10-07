const whiteList = [
  "https://www.google.com",
  "http://localhost:127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    whiteList.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
};

module.export = corsOptions;
