import mongoose from "mongoose";

const awardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String }, // e.g. "Best Luxury Design Winner"
    year: { type: Number, required: true },
    certificateImage: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Award", awardSchema);
