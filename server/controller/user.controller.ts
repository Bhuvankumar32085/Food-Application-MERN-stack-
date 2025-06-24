import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

// ✅ Signup Controller
export const signup = async (req: Request, res: Response) => {
  const { fullname, email, password, contact } = req.body;

  console.log(req.body);
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists with this email",
    });
  }

  //🔐 Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = generateVerificationCode(); //Generates a 6-digit number

  // 🆕 Create and Save new user
  const newUser = new User({
    fullname,
    email,
    password: hashedPassword,
    contact: Number(contact),
    verificationToken,
    verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  await newUser.save();

  generateToken(res, newUser);
  await sendVerificationEmail(email, verificationToken);

  const userWithoutPassword = await User.findOne({ email }).select("-password");
  // ✅ Respond success
  return res.status(201).json({
    success: true,
    message: "Signup successful",
    user: userWithoutPassword,
  });
};

//  ✅ Login Controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "incorrect emaul or password",
    });
  }

  const isPasswordMatsh = await bcrypt.compare(password, user.password);
  if (!isPasswordMatsh) {
    return res.status(400).json({
      success: false,
      message: "incorrect emaul or password",
    });
  }

  generateToken(res, user);


  user.lastLogin = new Date();
  await user.save();

  const userWithoutPassword = await User.findOne({ email }).select("-password");
  // ✅ Respond success
  return res.status(201).json({
    success: true,
    message: "Login successful",
    user: userWithoutPassword,
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  console.log("Verification Code:", req.body.otp.join(''));
  const user = await User.findOne({
    verificationToken: req.body.otp.join(''),
    verificationTokenExpiresAt: { $gt: new Date() },
  }).select("-password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification token",
    });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  await sendWelcomeEmail(user.email, user.fullname);

  // ✅ Respond success
  return res.status(201).json({
    success: true,
    message: "Email verified successfully",
    user,
  });
};

export const logout = async (req: Request, res: Response) => {
  return res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

//yaha email aagi or hum us eamil pe link send karege
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User doesn't exist",
    });
  }

  const resetToken = crypto.randomBytes(40).toString("hex");
  const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hr
  user.resetPasswordToken = resetToken;
  user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
  await user.save();

  //send email
  await sendPasswordResetEmail(
    user.email,
    `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
  );

  // ✅ Respond success
  return res.status(201).json({
    success: true,
    message: "Email verified successfully",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiresAt = undefined;
  user.save();

  // email pe message bhejege ki password change ho gaya
  await  sendResetSuccessEmail(user.email);

  // ✅ Respond success
  return res.status(201).json({
    success: true,
    message: "Password reset successfully",
  });
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  const userId = req.id;
  // console.log('checkAuth----->',userId)
  const user = await User.findById(userId).select("-password");
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;

    // ✅ Upload image to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(profilePicture);

    // ✅ Use secure_url from Cloudinary response
    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture: cloudResponse.secure_url,
    };

    // ✅ Update user
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
