const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

// const logger = (req, res, next) => {
//   const origin = req.get("Origin") || "no-origin";
//   const referer = req.get("Referer") || "no-referer";
//   const ua = req.get("User-Agent");

//   logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqLog.txt");
//   //   console.log(`${req.method} ${req.path}`);
//   console.log(
//     `${new Date().toISOString()}  ${
//       req.method
//     }  origin=${origin}  referer=${referer}  ua=${ua}  url=${req.url}`
//   );

//   next();
// };

// middleware/logEvents.js

const logger = (req, res, next) => {
  const origin = req.get("Origin") || "[no Origin header]";
  const referer = req.get("Referer") || "[no Referer header]";
  const ua = req.get("User-Agent") || "[no User-Agent]";

  const logItem = `${new Date().toISOString()}\t${
    req.method
  }\torigin=${origin}\treferer=${referer}\turl=${req.url}\tua=${ua}\n`;

  console.log(logItem);

  fs.appendFile(
    path.join(__dirname, "..", "logs", "reqLog.txt"),
    logItem,
    (err) => {
      if (err) throw err;
    }
  );

  next();
};

module.exports = { logger };

module.exports = { logger, logEvents };
