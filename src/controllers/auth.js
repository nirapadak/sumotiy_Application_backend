const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helper/auth');

exports.register = async (req, res) => {
  try {
    const { name, email, password, bookNumber, role } = req.body;

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password is required and password must be long 6 digit" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
      bookNumber,
      role
    }).save();

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        bookNumber: user.bookNumber,
        role: user.role
      },
      token
    })

  } catch (error) {
    console.log(error);
  }
}

// user login here --------------------------------

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({ error: "Enter a valid email Address" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "user does not exist" })
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.json({ error: "invalid email and password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    })

    res.json({
      user: {
        name: user.name,
        email: user.email,
        bookNumber: user.bookNumber,
        role: user.role
      },
      token
    })

  } catch (error) {
    console.log(error);
  }
}

