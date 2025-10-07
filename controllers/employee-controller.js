const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

// Get all employees
const getAllEmployees = (req, res) => {
  res.status(200).json(data.employees);
};

//Create new employee
const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    res.status(400).json({ message: "First and Lastname are required" });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res
    .status(201)
    .json({ message: "Employee created successfully", employee: newEmployee });
};

//Update employee
const updateEmployees = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  } else if (req.body.firstname) {
    employee.firstname = req.body.firstname;
  } else if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

// Delete employees
const deleteEmployee = (req, res) => {
  res.json({ id: req.body.id });
};

// Delete employees
// const deleteEmployees = (req, res) => {
//   res.json({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//   });
// };

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployees,
  deleteEmployee,
  getEmployee,
};
