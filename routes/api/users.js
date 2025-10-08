const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users-controller");

router.route("/").post(usersController.handleNewUser);

module.exports = router;
