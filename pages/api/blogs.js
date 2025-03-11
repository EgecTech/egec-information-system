import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  try {
    await mongooseConnect(); // تأكد من الاتصال لمرة واحدة

    const { method } = req;

    switch (method) {
      case "POST": {
        const { title, slug, images, description, blogcategory, tags, status } =
          req.body;

        if (!title || !slug || !description || !blogcategory || !status) {
          return res.status(400).json({ error: "Required fields are missing" });
        }

        if (tags && !Array.isArray(tags)) {
          return res.status(400).json({ error: "Tags must be an array" });
        }

        const newBlog = await Blog.create({
          title,
          slug,
          images,
          description,
          blogcategory,
          tags,
          status,
        });

        return res.status(201).json(newBlog);
      }

      case "GET": {
        if (req.query?.id) {
          const blog = await Blog.findById(req.query.id).lean();
          if (!blog) return res.status(404).json({ error: "Blog not found" });
          return res.json(blog);
        }

        const blogs = await Blog.find().sort({ _id: -1 }).lean();
        return res.json(blogs);
      }

      case "PUT": {
        const {
          _id,
          title,
          slug,
          images,
          description,
          blogcategory,
          tags,
          status,
        } = req.body;

        if (!_id) return res.status(400).json({ error: "Blog ID is required" });

        const updatedBlog = await Blog.findByIdAndUpdate(
          _id,
          { title, slug, images, description, blogcategory, tags, status },
          { new: true, lean: true }
        );

        if (!updatedBlog)
          return res.status(404).json({ error: "Blog not found" });

        return res.json(updatedBlog);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!id)
          return res
            .status(400)
            .json({ error: "Blog ID is required for deletion" });

        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog)
          return res.status(404).json({ error: "Blog not found" });

        return res.json({
          success: true,
          message: "Blog deleted successfully",
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
