import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "Interior", "Architecture", "Consulting", "IT"
    slug: { type: String, required: true, unique: true },
    icon: { type: String }, // icon key or image path
    coverImage: { type: String },
    order: { type: Number, default: 0 }, // number badge, e.g. 01/02/03/04
    shortDescription: { type: String },
    fullDescription: { type: String },
    offerings: [{ type: String }], // bullet list e.g. ["Interior Design", "Renovation", ...]
    category: {
      type: String,
      enum: ["design-build", "technology"],
      default: "design-build",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
