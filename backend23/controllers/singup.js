import User from "../models/User.js";
import bcrypt from "bcryptjs"; // typo fix: bcrypt instead of bycrypt

const singup = async (req, res) => {
  try {
    let { name, username, password } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword, // FIX: Save hashed password
      role: "user" // Default role is user. (Admin manually DB se banayein)
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default singup;