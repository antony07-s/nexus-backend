import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    contactNo: { type: String, required: true, trim: true },
    budget: { type: String },
    projectType: {
      type: String,
      enum: ["Residential", "Commercial", "Renovation", "IT / Technology", "Other"],
      default: "Residential",
    },
    siteAddress: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactMessage", contactMessageSchema);
