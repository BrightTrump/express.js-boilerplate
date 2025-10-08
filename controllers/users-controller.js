const usersDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// User registration
//Create new user

//Update user

//Update users

// Delete users

// Delete users
// const deleteUsers = (req, res) => {
//   res.json({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     lastname: req.body.email,
//   });
// };

const getUser = (req, res) => {
  const user = data.users.find((emp) => emp.id === parseInt(req.params.id));
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.body.id}  not found` });
  }

  res.status(201).json(user);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  updateUsers,
  deleteUser,
  getUser,
};
