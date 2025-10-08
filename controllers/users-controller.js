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
const handleNewUser = async (req, res) => {
  const { user, email, pwd } = req.body;

  if (!user) return res.status(400).json({ message: "Username is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!pwd) return res.status(400).json({ message: "Password is required" });

  // Check for duplicate usernames in the db
  const usernameDuplicate = usersDB.users.find(
    (person) => person.username === user
  );
  const emailDuplicate = usersDB.users.find((person) => person.email === email);
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
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//User login
const handleUserLogin = async (req, res) => {
  const { user, email, pwd } = req.body;
};

module.exports = {
  handleNewUser,
  handleUserLogin,
};
