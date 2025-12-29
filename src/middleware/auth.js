const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.requireSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.json({ error: "Invalid authorization" })
  }
}

// exports.isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (user.role != 1) {
//       return res.json({ error: "unAuthorized admin" })
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }



exports.isAdmin = async (req, res, next) => {
  try {
    // Check authentication first
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        error: "Unauthorized: User not logged in",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // role: 1 = admin
    if (user.role !== "1") {
      return res.status(403).json({
        error: "Access denied: Admin only",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({
      error: "Server error",
    });
  }
};
