import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { // FIX: Added NOT (!) operator
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      "YOUR_SECRET_KEY", // Real app me ise .env me rakhein
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // Sending token to frontend
      user: { name: user.name, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default login;