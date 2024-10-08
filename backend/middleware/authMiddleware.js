const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/userModel");

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //reading the jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized! Token Failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized! No Token" });
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as ADMIN!" });
  }
};

module.exports = {
  protect,
  admin,
};
