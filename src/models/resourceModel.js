import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    url: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX"],
    },
    tags: { type: [String], default: [] },
    summary: { type: String, maxLength: 300 },
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
