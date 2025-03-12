import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Spinner from "./Spinner";

export default function University({
  _id,
  name: existingName,
  country: existingCountry,
  images: existingImages,
  faculties: existingFaculties,
  email: existingEmail,
  phone: existingPhone,
  address: existingAddress,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [name, setName] = useState(existingName || "");
  const [country, setCountry] = useState(existingCountry || "");
  const [images, setImages] = useState(existingImages || []);
  const [faculties, setFaculties] = useState(existingFaculties || []);
  const [email, setEmail] = useState(existingEmail || "");
  const [phone, setPhone] = useState(existingPhone || "");
  const [address, setAddress] = useState(existingAddress || "");
  const [status, setStatus] = useState(existingStatus || "");
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function saveUniversity(ev) {
    ev.preventDefault();
    if (!name || !country || !email || !phone || !address || !status) {
      toast.error("Please fill in all required fields!");
      return;
    }
    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }
    const data = {
      name,
      country,
      images,
      faculties,
      email,
      phone,
      address,
      status,
    };
    try {
      if (_id) {
        await axios.put("/api/universities", { ...data, _id });
        toast.success("University Updated");
      } else {
        await axios.post("/api/universities", data);
        toast.success("University Created");
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving university:", error);
      toast.error("An error occurred while saving the university.");
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
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
      setIsUploading(false);
      toast.success("Images Uploaded");
    }
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

  if (redirect) {
    router.push("/universities");
    return null;
  }

  return (
    <form
      className="bg-gray-100 shadow-lg rounded-2xl p-6"
      onSubmit={saveUniversity}
    >
      <div className="mb-4">
        <label>University Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="mb-4">
        <label>Upload Images:</label>
        <input type="file" multiple onChange={uploadImages} />
        {isUploading && <Spinner />}
      </div>
      {!isUploading && (
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          animation={200}
        >
          {images.map((link, index) => (
            <div key={link}>
              <img src={link} alt="University" />
              <button onClick={() => handleDeleteImage(index)}>
                <MdDeleteForever />
              </button>
            </div>
          ))}
        </ReactSortable>
      )}
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-4 rounded"
      >
        Save University
      </button>
    </form>
  );
}
