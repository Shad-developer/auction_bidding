const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    image: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
    },
    commissionBalance: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    // verificationToken: String,
    // verificationTokenExpiresAt: Date,
    ResetPasswordToken: String,
    ResetPasswordTokenExpiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
