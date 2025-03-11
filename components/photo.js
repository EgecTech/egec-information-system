import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinner from "./Spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";

export default function Photo({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);

  const [isUploading, setIsUpLoading] = useState(false);
  const uploadImagesQueue = [];

  async function createBlog(ev) {
    ev.preventDefault();

    if (!title || !slug || !images) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = {
      title,
      slug,
      images,
    };

    try {
      if (_id) {
        await axios.put("/api/photos", { ...data, _id });
        toast.success("Blog Updated");
      } else {
        await axios.post("/api/photos", data);
        toast.success("Blog Created");
      }
      setRedirect(true);
    } catch (error) {
      console.error(
        "Error creating/updating blog:",
        error.response?.data || error.message
      );
      toast.error("An error occurred while saving the blog.");
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUpLoading(true);
      const uploadPromises = [];

      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        uploadPromises.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      await Promise.all(uploadPromises);
      setIsUpLoading(false);
      toast.success("Images Uploaded");
    } else {
      toast.error("An error occurred while uploading images.");
    }
  }

  if (redirect) {
    router.push("/gallery");
    return null;
  }

  function updateImagesOrder(newImages) {
    setImages([...newImages]);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success("Image Deleted Successfully");
  }

  const handleSlugChange = (ev) => {
    setSlug(ev.target.value.trim().replace(/\s+/g, "-").toLowerCase());
  };

  return (
    <>
      <form
        className="bg-gray-100 shadow-lg rounded-2xl p-6 addWebsiteform"
        onSubmit={createBlog}
      >
        {/* Title Field */}
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="title" className="text-gray-800 font-semibold w-full">
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter small title"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>

        {/* Slug Field */}
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="slug" className="text-gray-800 font-semibold w-full">
            Slug:
          </label>
          <input
            type="text"
            id="slug"
            placeholder="Enter Slug URL"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={slug}
            onChange={handleSlugChange}
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col items-start mb-4">
          <label
            htmlFor="images"
            className="text-gray-800 font-semibold w-full "
          >
            Upload Images:
          </label>
          <div className="relative w-full  border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center bg-white cursor-pointer hover:border-indigo-500 transition">
            <input
              type="file"
              id="fileInput"
              className="absolute inset-0 w-full h-full cursor-pointer"
              accept="image/*"
              multiple
              onChange={uploadImages}
            />
            <div className="flex flex-col items-center">
              <FaCloudUploadAlt className="text-indigo-500 text-3xl" />
              <span className="text-gray-500">
                Click or drag files to upload
              </span>
            </div>
          </div>
          <div className="w-100 flex flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>
        {!isUploading && (
          <div className="flex">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImagesOrder}
              animation={200}
              className="flex gap-1"
            >
              {images?.map((link, index) => (
                <div key={link} className="uploadedimg">
                  <img src={link} alt="image" className="object-cover" />
                  <div className="deleteimg">
                    <button onClick={() => handleDeleteImage(index)}>
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 mt-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 addwebbtn"
        >
          Save Blog
        </button>
      </form>
    </>
  );
}
