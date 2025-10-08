const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

// User registration
//Create new user
const handleNewUser = async (req, res) => {};
const { user, email, pwd } = req.body;

if (!user || !email || !pwd)
  return res
    .status(400)
    .json({ message: "Username, Email, and Password are required" });

// Check for duplicate usernames in the db
const usernameDuplicate = usersDB.find((person) => person.username === user);
const emailDuplicate = usersDB.find((person) => person.username === user);
if (usernameDuplicate)
  return res.status(409).json({ message: "Username already exist!" }); // Conflict
if (emailDuplicate)
  return res.status(409).json({ message: "Email already exist!" }); // Conflict
try {
  // Encrypt the password
  const hashedPwd = await bcrypt.hash(pwd, 10);
  // Store the new user in the DB
  const newUser = { username: user, email: email, password: hashedPwd };
  usersDB.setUsers([...usersDB.users, newUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  console.log(usersDB.users);
  res.status(201).json({ success: `New user ${user} created!` });
} catch (error) {
  res.status(500).json({ message: error.message });
}

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

module.exports = {
  handleNewUser,
};
