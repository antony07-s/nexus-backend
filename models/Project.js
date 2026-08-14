import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String },
    location: { type: String },
    category: {
      type: String,
      enum: ["Interior", "Architecture", "Consulting", "IT", "Residential", "Commercial"],
      required: true,
    },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    description: { type: String },
    year: { type: Number },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
