const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
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

module.exports = mongoose.model("User", SignUpSchema);
