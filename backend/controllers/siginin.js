const SignInSchema = require("../models/SignInModel");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if username and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required!" });
    }

    // Find the user by email
    const user = await SignInSchema.findOne({ email });

    console.log("User", user);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    if (user.password != password) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
    // const isPasswordValid = await user.(password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Incorrect password" });
    // }

    // If everything is correct, user is authenticated
    res.status(200).json({ message: "Sign-in successful", user });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided for sign-in
    if (email && password) {
      // Handle sign-in request if email and password are provided
      return exports.signIn(req, res);
    }

    // If no sign-in request, return the user list
    const users = await SignInSchema.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting user list:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
