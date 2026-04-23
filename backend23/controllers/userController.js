import User from "../models/User.js";

// user create krna
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all users
export const getUser = async (req, res) => {
  try {
    // Exclude sensitive fields like password when returning users
    const users = await User.find({}, "name username role status createdAt updatedAt");

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
     req.params.id, 
     req.body,
     { new: true }
    );

   res.status(201).json({
      message: "user updated successfully",
      data: user,
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// delete user

// get all users
export const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "user deleted successfully"
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};