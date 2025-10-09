const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User registration
//Create new user
const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username)
    return res.status(400).json({ message: "Username is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  // Check for duplicate usernames in the db
  const usernameDuplicate = usersDB.users.find(
    (person) => person.username === username
  );
  const emailDuplicate = usersDB.users.find((person) => person.email === email);
  if (usernameDuplicate)
    return res.status(409).json({ message: "Username already exist!" }); // Conflict
  if (emailDuplicate)
    return res.status(409).json({ message: "Email already exist!" }); // Conflict
  try {
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the new user in the DB
    const newUser = {
      username: username,
      roles: {
        User: 2001,
      },
      email: email,
      password: hashedPassword,
    };
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users, null, 2)
    );

    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//User login
const handleUserLogin = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if ((!username && !email) || !password)
    return res.status(400).json({
      message: "Either username or email, and a password is required",
    });

  const foundUser = usersDB.users.find(
    (person) =>
      (username && person.username === username) ||
      (email && person.email === email)
  );
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //Saving refresh token with current user
    const otherUsers = usersDB.users.filter(
      (person) =>
        person.username !== foundUser.username ||
        person.email !== foundUser.email
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    // res
    //   .status(200)
    //   .json({ success: `User ${foundUser.username} logged in succesfully!` });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" }); //Unauthorized
  }
};

// User logout
const handleUserLogout = async (req, res) => {
  // On the client-side, Cookie, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); // No content
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  // Is refresh token in the db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204); // No content
  }
  //Delete the refresh token in db
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true }); // Secure: true- Only serves on https
  res.sendStatus(204);
};

module.exports = {
  handleNewUser,
  handleUserLogin,
  handleUserLogout,
};
