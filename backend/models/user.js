const pool = require("../config/db");

const createUser = async (username, hashedPassword) => {
  return pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, hashedPassword]
  );
};

const findUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername,
};
