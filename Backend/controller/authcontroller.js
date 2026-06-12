import handleError from "../helpper/handleError.js";
import user from "../model/user.js";
import cookie from "../helpper/cookie.js";
import sendEmail from "../helpper/mail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

export const register = async (req, res, next) => {
  const { avatar } = req.body;
  const userExist = await user.findOne({ email: req.body.email });
  if (userExist) {
    return next(new handleError("User already exist", 400));
  }

  const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: "Ecom_avathar",
    width: 110,
    crop: "scale",
  });

  const newUser = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avathar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  const token = await newUser.generateToken(newUser);

  cookie(res, token);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
};

export const login = async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new handleError("Please enter name and password", 400));
  }

  const userExist = await user.findOne({
    $or: [{ email: name }, { name: name }],
  });

  if (!userExist) {
    return next(new handleError("Invalid email or password", 401));
  }

  const isPasswordMatch = await userExist.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new handleError("Invalid email or password", 401));
  }

  const token = await userExist.generateToken(userExist);

  cookie(res, token);

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: userExist,
  });
};

export const logout = async (req, res, next) => {
  res.clearCookie("token", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.json({
    success: true,
    message: "Logout successful",
  });
};

export const getUser = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const userExist = await user.findOne({ email: email });

  if (!userExist) {
    return next(new handleError("User not found", 404));
  }

  const resetToken = await userExist.generateResetPasswordToken();

  await userExist.save({ validateBeforeSave: false });

  const message = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Password</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }

    .container {
      width: 100%;
      padding: 40px 0;
    }

    .email-box {
      max-width: 500px;
      background: #ffffff;
      margin: auto;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }

    h1 {
      color: #333333;
      margin-bottom: 20px;
    }

    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.6;
    }

    .btn {
      display: inline-block;
      margin-top: 25px;
      padding: 14px 28px;
      background-color: #2563eb;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
    }

    .expire-text {
      margin-top: 20px;
      color: #d32f2f;
      font-size: 14px;
      font-weight: bold;
    }

    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #999999;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="email-box">

      <h1>Reset Your Password</h1>

      <p>
        We received a request to change your password.
        Use the code below to create a new password.
      </p>

      <h1>${resetToken}</h1>

      <p class="expire-text">
        This reset link will expire in 2 minutes.
      </p>

      <div class="footer">
        If you did not request a password reset,
        you can safely ignore this email.
      </div>

    </div>
  </div>
</body>
</html>`;

  await sendEmail({
    email: userExist.email,
    subject: "Reset Your Password",
    message,
  });

  res.status(200).json({
    success: true,
    message: `Email sent to ${userExist.email} successfully`,
    resetToken,
  });
};

export const resetPassword = async (req, res, next) => {
  const token = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const userExist = await user.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!userExist) {
    return next(new handleError("Invalid or expired reset token", 400));
  }

  userExist.password = req.body.password;
  userExist.resetPasswordToken = undefined;
  userExist.resetPasswordExpire = undefined;
  await userExist.save();

  res.status(200).json({
    success: true,
    message: "Password changed successful",
  });
};

export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.user);

  const userExist = await user.findById(req.user._id);
  if (!userExist) {
    return next(new handleError("User not found", 404));
  }

  if (!userExist.comparePassword(oldPassword)) {
    return next(new handleError("Old password is incorrect", 400));
  }

  userExist.password = newPassword;
  await userExist.save();

  res.status(200).json({
    success: true,
    message: "Password changed successful",
  });
};
