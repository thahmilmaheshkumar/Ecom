import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validate from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Please enter the valid email"],
      unique: true,
      validate: [validate.isEmail, "Please enter the valid email"],
    },

    password: {
      type: String,
      required: [true, "Please enter the pssword"],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    avathar: {
      public_id: {
        type: String,
        required: [true, "Please enter the public id"],
      },

      url: {
        type: String,
        required: [true, "Please enter the image url"],
      },
    },

    role: {
      type: String,
      default: "user",
    },

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomInt(1000000).toString();

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 2 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("user", userSchema);
