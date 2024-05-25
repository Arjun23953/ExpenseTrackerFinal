const mongoose = require("mongoose");

const SignInSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", SignInSchema);
