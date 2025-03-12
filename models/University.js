import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
  },
});

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  website: { type: String },
  phone: { type: String },
  location: { type: String },
  logo: { type: String },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  colleges: [collegeSchema],
});

const University = mongoose.model("University", universitySchema);
export default University;
