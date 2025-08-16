const User = require("../models/user");
const { gentoken } = require("../middlewares/jwtauth");

async function handleusersignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    const token = gentoken({ id: user._id, email: user.email });
    return res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    return res.status(400).json({ error: "Signup failed" });
  }
}

async function handleuserlogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ismatch = await user.comparepass(password);
    if (!ismatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = gentoken({ id: user._id, email: user.email });
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { handleusersignup, handleuserlogin };

