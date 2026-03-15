const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  console.log("🔐 Auth Middleware - Headers:", req.headers.authorization);
  
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  console.log("✅ Token received:", token.substring(0, 20) + "...");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", { id: decoded.id, role: decoded.role });
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticateUser;
