import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
  encounterId: String,
  hasPneumonia: Boolean,
  prob: Number,
  features: [String],
  explanation: String,
}, { timestamps: true });

export default mongoose.model("Prediction", PredictionSchema);
