const SignInSchema = require("../models/SignInModel");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if username and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Check if user already exists
    const existingUser = await SignInSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create a new user
    const newUser = new SignInSchema({ email, password });
    await newUser.save();

    // User registration successful
    res.status(201).json({ message: "Sign-up successful", user: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
