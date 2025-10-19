// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.routes.js";

// dotenv.config({ path: ".env" });

// const app = express();
// const MONGODB_URI = process.env.MONGODB_URI;
// const PORT = 5812;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/main", authRoutes);
// try {
//   mongoose.connect(MONGODB_URI).then(console.log("connected successfully"));
// } catch (error) {
//   console.log("not CONNNECTED", error.message);
// }

// app.get("/get-token", async (req, res) => {
//   try {
//     const token = new AccessToken(
//       process.env.LIVEKIT_API_KEY,
//       process.env.LIVEKIT_API_SECRET,
//       {
//         identity: "user-" + Math.random().toString(36).substring(2, 8),
//       }
//     );

//     token.addGrant({ roomJoin: true, room: "meditalk" });
//     res.json({ token: await token.toJwt() });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Failed to create token" });
//   }
// });

// app.listen(PORT, () => {
//   console.log("running on port 5812");
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import { AccessToken } from "livekit-server-sdk";
import { Room, RoomEvent } from "livekit-server-sdk"; // Use appropriate LiveKit server SDK

dotenv.config({ path: ".env" });

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 5812;

// Directory to save uploaded files
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ------------------- Middleware -------------------
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/main", authRoutes);

// ------------------- MongoDB Connection -------------------
try {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"));
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
}

// ------------------- LiveKit Token Endpoint -------------------
app.get("/get-token", async (req, res) => {
  try {
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: "user-" + Math.random().toString(36).substring(2, 8),
      }
    );

    token.addGrant({ roomJoin: true, room: "meditalk-room" });
    res.json({ token: await token.toJwt() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create token" });
  }
});

// ------------------- LiveKit Room Setup -------------------
const room = new Room();

// Register byte stream handler for X-ray images
room.registerByteStreamHandler("xray-image", async (reader, participant) => {
  console.log(`Received X-ray image from ${participant.identity}`);

  const chunks = [];
  for await (const chunk of reader) {
    chunks.push(chunk);
  }

  const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
  const imageData = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    imageData.set(chunk, offset);
    offset += chunk.length;
  }

  // Save the image to disk
  const filePath = path.join(uploadDir, reader.info.name);
  fs.writeFileSync(filePath, imageData);
  console.log(`Saved X-ray image to: ${filePath}`);

  // -----------------------------
  // Trigger AI analysis (placeholder)
  // -----------------------------
  const aiResponse = `Received your X-ray image "${reader.info.name}". Preliminary analysis indicates: no obvious signs of pneumonia. Please consult a licensed physician for a full diagnosis.`;

  try {
    // Send text response back to the participant who uploaded
    if (room.localParticipant) {
      await room.localParticipant.sendText(aiResponse, {
        destinationIdentities: [participant.identity],
      });
      console.log(`Sent AI analysis response to ${participant.identity}`);
    }
  } catch (err) {
    console.error("Failed to send AI response:", err);
  }
});

// Optional: handle room events
room.on(RoomEvent.ParticipantConnected, (participant) => {
  console.log(`Participant connected: ${participant.identity}`);
});
room.on(RoomEvent.ParticipantDisconnected, (participant) => {
  console.log(`Participant disconnected: ${participant.identity}`);
});

// ------------------- Start Express Server -------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
