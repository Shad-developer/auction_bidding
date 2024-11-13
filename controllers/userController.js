const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
} = require("../utils/userHelper");
const sendMail = require("../utils/sendMail");
const cloudinary = require("cloudinary").v2;

// register user by default buyer, but when login as seller then become seller user automatically
module.exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "fill all required fields" });
    throw new Error("Fill all required fields");
  }

  // check password length
  if (password.length < 8) {
    res
      .status(400)
      .json({ message: "Password should be at least 8 characters long" });
    throw new Error("Password should be at least 8 characters long");
  }

  // check if user exist
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await hashPassword(password);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // generate token
  const token = generateToken(user._id);
  res.cookie("Token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  if (user) {
    res.status(201).json({ message: "User registered successfully", user });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login buyer
module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "fill all required fields" });
    throw new Error("Fill all required fields");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "user not found" });
    throw new Error("User not Found");
  }

  const matchPassword = await comparePassword(password, user.password);
  if (!matchPassword) {
    res.status(401).json({ message: "password not matched" });
    throw new Error("Invalid password");
  }

  const token = generateToken(user._id);
  res.cookie("token", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true,
    sameSite: "strict",
  });

  if (user) {
    res.status(200).json({ message: "User logged in successfully", user });
  } else {
    res.status(401).json({ message: "invalid credentials" });
    throw new Error("Invalid credentials");
  }
});

module.exports.loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ loggedIn: false });
  }
  try {
    // Verify the token
    const verified = verifyToken(token);
    if (verified) {
      return res.status(200).json({ loggedIn: true });
    } else {
      return res.status(200).json({ loggedIn: false });
    }
  } catch (error) {
    console.error("Token verification error:", error.message);

    return res.status(200).json({ loggedIn: false });
  }
});

// logout
module.exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({ message: "User logged out successfully" });
});

// seller profile login
module.exports.sellerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Fill all required fields");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }

  const matchPassword = await comparePassword(password, user.password);
  if (!matchPassword) {
    res.status(401);
    throw new Error("Invalid password");
  }

  user.role = "seller";
  await user.save();

  const token = generateToken(user._id);
  res.cookie("token", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });

  if (user) {
    res.status(200).json({ message: "Seller logged in successfully", user });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//get my login details
module.exports.getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ user });
});

// get my balance
module.exports.getUserBalance = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ balance: user.balance });
});

// get all users by admin
module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find().select("-password");
  if (!users) {
    res.status(404);
    throw new Error("Users not found");
  }
  res.status(200).json({ users });
});

// estimate income commision balance of admin
module.exports.estimateIncome = asyncHandler(async (req, res) => {
  const admin = await userModel.findOne({ role: "admin" });
  if (!admin) {
    res.status(404);
    throw new Error("Admin Not found");
  }
  const commissionBalance = admin.commissionBalance;
  res.status(200).json({ commissionBalance });
});

// forgot password
module.exports.forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: "User not found with this email" });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.ResetPasswordToken = resetToken;
    user.ResetPasswordTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
            <h1>Password Reset OTP</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hello,</p>
            <p>Your Password Reset code is:</p>
            <h1 style="font-size: 36px; color: #4CAF50; text-align: center;">${resetToken}</h1>
            <p>Enter this code on the verification page to reset your Password.</p>
            <p>This code will expire in <b>24 Hours</b> for security reasons.</p>
            <p>If you did not create an account with us, please ignore this email.</p>
            <br />
            <p>Best regards,</p>
            <p>Bidding App</p>
          </div>
        </div>
      `;

    await sendMail(user.email, "Bidding App - Password Reset", emailTemplate);

    await user.save();

    return res.status(200).json({
      error: true,
      message: "Password Reset OTP Sent",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// reset password
module.exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    const { code, password } = req.body;

    if (!code || !password) {
      return res
        .status(400)
        .send({ error: true, message: "All fields required" });
    }

    const user = await userModel.findOne({
      ResetPasswordToken: code,
      ResetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).send({ error: true, message: "Invalid OTP Code" });
    }

    //   hashed password
    const hashedPassword = await hashPassword(password);

    await userModel.updateOne({ _id: user._id }, { password: hashedPassword });

    user.ResetPasswordToken = undefined;
    user.ResetPasswordTokenExpiresAt = undefined;
    await user.save();

    const token = generateToken(user._id);
    res.cookie("token", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000, //MS
      httpOnly: true,
      sameSite: "strict",
    });

    res
      .status(200)
      .send({ error: false, user, message: "Password Reset Successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// update profile
module.exports.updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name } = req.body;

  const user = await userModel.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }

  // upload image
  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "User/Profile",
        resource_type: "image",
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500);
      throw new Error("Image upload failed");
    }

    //  if update the image then remove previous image from cloudinary
    if (user.image && user.image.public_id) {
      try {
        await cloudinary.uploader.destroy(user.image.public_id);
      } catch (error) {
        console.error("Cloudinary delete image error:", error);
      }
    }

    fileData = {
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      filePath: uploadedFile.secure_url,
      public_id: uploadedFile.public_id,
    };
  }

  const updateProfile = await userModel.findByIdAndUpdate(
    userId,
    {
      name,
      image: req.file ? fileData : user?.image,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateProfile) {
    res.status(404).json({ message: "Profile update failed" });
    throw new Error("Profile update failed");
  }

  res
    .status(201)
    .json({
      success: true,
      message: "Profile update successfully",
      data: updateProfile,
    });
});
