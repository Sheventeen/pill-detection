import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies.JWTToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT);

    const user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.userID = user._id;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
