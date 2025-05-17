const jwt = require("jsonwebtoken");

const handleTokenRefresh = (req, res) => {
  const cookies = req.cookies;
  if(!cookies.jwt){
    return res.status(401).json({ error: "Hiányzó frissítő token" }); 
  }
  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Érvénytelen frissítő token" });
    }

    const accessToken = jwt.sign(
      { "UserInfo" : {
          "id": user.id,
          "username": user.username,
          "role": user.role
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ accessToken: accessToken });
  });
};

module.exports = { handleTokenRefresh };
