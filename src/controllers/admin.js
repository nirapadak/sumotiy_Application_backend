const User = require("../models/user");
const Member = require("../models/member");

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
}

// Get all Members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false,
      error: "Server error",
      message: error.message 
    });
  }
};
// =======================
