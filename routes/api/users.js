const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users-controller");

router.route("/register").post(usersController.handleNewUser);
router.route("/login").post(usersController.handleUserLogin);
router.route("/logout").get(usersController.handleUserLogout);

module.exports = router;
