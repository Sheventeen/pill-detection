import express from 'express';
import bcryptjs from 'bcryptjs';
import { setJWTandCookie } from '../misc/createJWTandCookie.js';
import { User } from '../models/user.model.js';

export const signup = async(req, res) => {
    const {fName, lName, email, password, sndPassword} = req.body;

    if (!fName || !lName || !email || !password || !sndPassword){
        throw new Error("Please enter all fields");
    }
    if( await User.findOne({email}) ){
        throw new Error("User already exists");
    }
    if (password !== sndPassword){
        throw new Error("Password fields much match");
    }
    const hashed_password = await bcryptjs.hash(password, 10);
    const user = new User({
        fName,
        lName,
        email,
        password: hashed_password
    });
    await user.save();
    return res.status(200).json({success: true, message:'User successfully created',
                                user: {...user._doc, password: undefined}})
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        throw new Error("Please enter all fields");
    }
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password, Please Try Again" });

    setJWTandCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
          ...user._doc,
        password: undefined
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
    
}