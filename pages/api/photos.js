import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {
      const { title, slug, images } = req.body;

      if (!title || !slug || !images) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const photoDos = await Photo.create({
        title,
        slug,
        images,
      });

      return res.status(201).json(photoDos);
    }

    if (method === "GET") {
      if (req.query?.id) {
        const photo = await Photo.findById(req.query.id);
        if (!photo) {
          return res.status(404).json({ error: "Photo not found" });
        }
        return res.json(photo);
      } else {
        return res.json((await Photo.find()).reverse());
      }
    }

    if (method === "PUT") {
      const { _id, title, slug, images } = req.body;

      if (!_id) {
        return res.status(400).json({ error: "Photo ID is required" });
      }

      const updatedPhoto = await Photo.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          images,
        },
        { new: true }
      );

      if (!updatedPhoto) {
        return res.status(404).json({ error: "Photo not found" });
      }

      return res.json(updatedPhoto);
    }

    if (method === "DELETE") {
      if (!req.query?.id) {
        return res
          .status(400)
          .json({ error: "Photo ID is required for deletion" });
      }

      const deletedPhoto = await Photo.findByIdAndDelete(req.query.id);
      if (!deletedPhoto) {
        return res.status(404).json({ error: "Photo not found" });
      }

      return res.json({
        success: true,
        message: "Photo deleted successfully",
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
