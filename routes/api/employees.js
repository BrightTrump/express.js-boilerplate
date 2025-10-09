const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employee-controller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verify-roles");
const verifyJWT = require("../../middleware/verify-jwt");

router
  .route("/")
  .get(verifyJWT, employeeController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.createNewEmployee
  )
  .patch(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.updateEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.updateEmployees
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

// router.route("/:id").get(getEmployee);

module.exports = router;
