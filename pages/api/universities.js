import { mongooseConnect } from "@/lib/mongoose";
import University from "@/models/University";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    const { method } = req;

    switch (method) {
      case "POST": {
        const {
          name,
          email,
          website,
          phone,
          location,
          logo,
          status,
          colleges,
        } = req.body;

        if (!name) {
          return res.status(400).json({ error: "University name is required" });
        }

        const newUniversity = await University.create({
          name,
          email,
          website,
          phone,
          location,
          logo,
          status: status || "draft", // افتراضيًا "draft" إذا لم يتم الإرسال
          colleges: colleges || [],
        });

        return res.status(201).json(newUniversity);
      }

      case "GET": {
        const { id, status } = req.query;

        if (id) {
          const university = await University.findById(id).lean();
          if (!university)
            return res.status(404).json({ error: "University not found" });
          return res.json(university);
        }

        // جلب الجامعات مع خيار الفلترة حسب status
        const query = status ? { status } : {};
        const universities = await University.find(query)
          .sort({ createdAt: -1 })
          .lean();
        return res.json(universities);
      }

      case "PUT": {
        const {
          _id,
          name,
          email,
          website,
          phone,
          location,
          logo,
          status,
          colleges,
        } = req.body;

        if (!_id)
          return res.status(400).json({ error: "University ID is required" });

        const updatedUniversity = await University.findByIdAndUpdate(
          _id,
          { name, email, website, phone, location, logo, status, colleges },
          { new: true, lean: true }
        );

        if (!updatedUniversity)
          return res.status(404).json({ error: "University not found" });

        return res.json(updatedUniversity);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!id)
          return res
            .status(400)
            .json({ error: "University ID is required for deletion" });

        const deletedUniversity = await University.findByIdAndDelete(id);
        if (!deletedUniversity)
          return res.status(404).json({ error: "University not found" });

        return res.json({
          success: true,
          message: "University deleted successfully",
        });
      }

      default:
        return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
