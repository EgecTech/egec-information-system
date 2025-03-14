// // pages/api/universities.js
import { mongooseConnect } from "@/lib/mongoose";
import { University } from "@/models/University";

export default async function handle(req, res) {
  try {
    await mongooseConnect(); // الاتصال بقاعدة البيانات

    const { method } = req;

    switch (method) {
      case "POST": {
        const requiredFields = ["name", "country", "status"];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const newUniversity = await University.create(req.body);
        return res.status(201).json(newUniversity);
      }

      case "GET": {
        if (req.query?.id) {
          const university = await University.findById(req.query.id).lean();
          if (!university)
            return res.status(404).json({ error: "University not found" });
          return res.json(university);
        }

        const universities = await University.find().sort({ _id: -1 }).lean();
        return res.json(universities);
      }

      case "PUT": {
        const { _id } = req.body;
        if (!_id)
          return res.status(400).json({ error: "University ID is required" });

        const updatedUniversity = await University.findByIdAndUpdate(
          _id,
          req.body,
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

// import { mongooseConnect } from "@/lib/mongoose";
// import { University } from "@/models/University";

// export default async function handle(req, res) {
//   try {
//     await mongooseConnect(); // تأكد من الاتصال لمرة واحدة

//     const { method } = req;

//     switch (method) {
//       case "POST": {
//         const {
//           name,
//           country,
//           email,
//           website,
//           phone,
//           location,
//           universitytype,
//           images,
//           status,
//           colleges,
//         } = req.body;

//         if (!name || !email || !status) {
//           return res.status(400).json({ error: "Required fields are missing" });
//         }

//         const newUniversity = await University.create({
//           name,
//           country,
//           email,
//           website,
//           phone,
//           location,
//           universitytype,
//           images,
//           status,
//           colleges,
//         });

//         return res.status(201).json(newUniversity);
//       }

//       case "GET": {
//         if (req.query?.id) {
//           const university = await University.findById(req.query.id).lean();
//           if (!university)
//             return res.status(404).json({ error: "University not found" });
//           return res.json(university);
//         }

//         const universities = await University.find().sort({ _id: -1 }).lean();
//         return res.json(universities);
//       }

//       case "PUT": {
//         const {
//           _id,
//           name,
//           country,
//           email,
//           website,
//           phone,
//           location,
//           universitytype,
//           images,
//           status,
//           colleges,
//         } = req.body;

//         if (!_id)
//           return res.status(400).json({ error: "University ID is required" });

//         const updatedUniversity = await University.findByIdAndUpdate(
//           _id,
//           {
//             name,
//             country,
//             email,
//             website,
//             phone,
//             location,
//             universitytype,
//             images,
//             status,
//             colleges,
//           },
//           { new: true, lean: true }
//         );

//         if (!updatedUniversity)
//           return res.status(404).json({ error: "University not found" });

//         return res.json(updatedUniversity);
//       }

//       case "DELETE": {
//         const { id } = req.query;
//         if (!id)
//           return res
//             .status(400)
//             .json({ error: "University ID is required for deletion" });

//         const deletedUniversity = await University.findByIdAndDelete(id);
//         if (!deletedUniversity)
//           return res.status(404).json({ error: "University not found" });

//         return res.json({
//           success: true,
//           message: "University deleted successfully",
//         });
//       }

//       default:
//         return res.status(405).json({ error: "Method Not Allowed" });
//     }
//   } catch (error) {
//     console.error("API Error:", error);
//     return res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// }
