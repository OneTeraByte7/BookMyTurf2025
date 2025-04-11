// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(401).json({ msg: "Not logged in" });

  const token = bearer.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "JWT_SECRET");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;
