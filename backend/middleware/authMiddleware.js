const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader?.startsWith('Bearer ')){
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error){ 
      return res.status(403).json({ error: "Érvénytelen token" });
    }
    //console.log("JWT payload:", user);

    req.id = user.UserInfo.id;
    req.username = user.UserInfo.username;
    req.role = user.UserInfo.role;
    next();
  });
};

module.exports = authenticateToken;
