import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverImage: { type: String },
    excerpt: { type: String },
    content: { type: String, required: true },
    author: { type: String, default: "Nexus Design & Built" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
