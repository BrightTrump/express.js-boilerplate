const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employee-controller");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployees)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

// router.route("/:id").get(getEmployee);

module.exports = router;
