const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // Fixed: Use decoded.id instead of decoded.userId
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticateUser;
