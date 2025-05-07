const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/user");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    await createUser(username, hashed);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Hibás felhasználónév vagy jelszó" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Hibás felhasználónév vagy jelszó" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Sikeres bejelentkezés", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bejelentkezés sikertelen" });
  }
};

module.exports = { register, login };
