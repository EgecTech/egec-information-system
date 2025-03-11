const { Schema, models, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, require: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: [{ type: String }],
    price: [{ type: String }],
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Shop = models.Shop || model("Shop", productSchema, "Shops");
