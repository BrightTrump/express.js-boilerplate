const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employee-controller");
const verifyJWT = require("../../middleware/verify-jwt");

router
  .route("/")
  .get(verifyJWT, employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .patch(employeeController.updateEmployee)
  .put(employeeController.updateEmployees)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

// router.route("/:id").get(getEmployee);

module.exports = router;
