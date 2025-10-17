import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "llm"], required: true }, 
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
  title: { type: String },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    data: [conversationSchema]
}) 

export const User = mongoose.model('user', userSchema);