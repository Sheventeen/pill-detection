import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config({ path: ".env" });

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 5812;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/main", authRoutes);
try {
  mongoose.connect(MONGODB_URI).then(console.log("connected successfully"));
} catch (error) {
  console.log("not CONNNECTED", error.message);
}

app.get("/get-token", async (req, res) => {
  try {
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: "user-" + Math.random().toString(36).substring(2, 8),
      }
    );

    token.addGrant({ roomJoin: true, room: "meditalk" });
    res.json({ token: await token.toJwt() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create token" });
  }
});

app.listen(PORT, () => {
  console.log("running on port 5812");
});
