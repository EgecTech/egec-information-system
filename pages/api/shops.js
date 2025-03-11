import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {
      const {
        title,
        slug,
        images,
        description,

        tags,
        afilink,
        price,
        status,
      } = req.body;

      if (!title || !slug || !description || !price || !status) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const productDos = await Shop.create({
        title,
        slug,
        images,
        description,

        tags,
        afilink,
        price,
        status,
      });

      return res.status(201).json(productDos);
    }

    if (method === "GET") {
      if (req.query?.id) {
        const product = await Shop.findById(req.query.id);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        return res.json(product);
      } else {
        return res.json((await Shop.find()).reverse());
      }
    }

    if (method === "PUT") {
      const {
        _id,
        title,
        slug,
        images,
        description,

        tags,
        afilink,
        price,
        status,
      } = req.body;

      if (!_id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const updatedProduct = await Shop.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          images,
          description,

          tags,
          afilink,
          price,
          status,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json(updatedProduct);
    }

    if (method === "DELETE") {
      if (!req.query?.id) {
        return res
          .status(400)
          .json({ error: "Product ID is required for deletion" });
      }

      const deletedProduct = await Shop.findByIdAndDelete(req.query.id);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json({
        success: true,
        message: "Product deleted successfully",
      });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
