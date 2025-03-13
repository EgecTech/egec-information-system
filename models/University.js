const { Schema, models, model } = require("mongoose");

const collegeSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String },
  sector: { type: String },
});

const universitySchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String },
    website: { type: String },
    phone: { type: String },
    location: { type: String },
    universityType: { type: String },
    images: [{ type: String }],
    status: { type: String },
    colleges: [collegeSchema],
  },
  { timestamps: true } // يقوم بإضافة createdAt و updatedAt تلقائيًا
);

export const University =
  models.University || model("University", universitySchema, "universities");
