const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/user");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ error: "A felhasználónév már foglalt!" });
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    await createUser(username, hashed);
    res.status(201).json({ message: "Sikeres regisztráció!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "A Regisztráció sikertelen!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: "A felhasználó nem létezik!" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Hibás felhasználónév vagy jelszó!" });
    }

    const accessToken = jwt.sign(
      { "UserInfo": {
          "id": user.id,
          "username" : user.username,
          "role" : "user"
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});

    res.status(200).json({ message: "Sikeres bejelentkezés!", accessToken: accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "A Bejelentkezés sikertelen!" });
  }
};

module.exports = { register, login };
