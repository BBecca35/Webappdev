const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.authHeader.Authorization;
  if(!authHeader?.startWith('Bearer ')){
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error){ 
      return res.status(403).json({ error: "Érvénytelen token" });
    }

    req.id = user.UserInfo.id;
    req.username = user.UserInfo.username;
    req.role = user.UserInfo.role;
    next();
  });
};

module.exports = authenticateToken;
