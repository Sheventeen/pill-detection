import express from "express";
import bcryptjs from "bcryptjs";
import { validateGmail, validatePassword } from "../misc/validateRegex.js";
import { setJWTandCookie } from "../misc/createJWTandCookie.js";
import { User } from "../models/user.model.js";

// export const signup = async(req, res) => {
//     const {fName, lName, email, password, sndPassword} = req.body;

//     if (!fName || !lName || !email || !password || !sndPassword){
//         throw new Error("Please enter all fields");
//     }
//     if( await User.findOne({email}) ){
//         throw new Error("User already exists");
//     }
//     if (password !== sndPassword){
//         throw new Error("Password fields much match");
//     }
//     if (!validateGmail(email)){
//       throw new Error('Must use valid email address');
//     }
//     if (!validatePassword(password)){
//         throw new Error("Must enter all fields for password");
//     }

//     const hashed_password = await bcryptjs.hash(password, 10);
//     const user = new User({
//         fName,
//         lName,
//         email,
//         password: hashed_password
//     });
//     await user.save();
//     return res.status(200).json({success: true, message:'User successfully created',
//                                 user: {...user._doc, password: undefined}})
// };

export const signup = async (req, res) => {
  try {
    const { fName, lName, email, password, sndPassword } = req.body;
    console.log("Signup attempt:", req.body);

    if (!fName || !lName || !email || !password || !sndPassword) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== sndPassword) {
      return res.status(400).json({ message: "Passwords must match" });
    }

    const hashed_password = await bcryptjs.hash(password, 10);
    const user = new User({
      fName,
      lName,
      email,
      password: hashed_password,
    });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User successfully created",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  console.log("Login attempt:", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please enter all fields");
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword)
      return res
        .status(401)
        .json({ message: "Invalid password, Please Try Again" });

    setJWTandCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("JWTToken");
    res.status(200).json({ success: true, message: "Logout Successful" });
  } catch (error) {
    res.status(501).json({ success: false, message: error.message });
  }
};
export const checkAuthorized = async (req, res) => {
  try {
    const user = await User.findById(req.userID).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const homePage = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: `Welcome to your home page, ${user.fName}!`,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
