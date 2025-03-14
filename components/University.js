// components/University.js
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

export default function University({
  _id,
  name: existingName,
  country: existingCountry,
  email: existingEmail,
  website: existingWebsite,
  phone: existingPhone,
  location: existingLocation,
  universitytype: existingUniversitytype,
  images: existingImages,
  status: existingStatus,
  colleges: existingColleges,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [name, setName] = useState(existingName || "");
  const [country, setCountry] = useState(existingCountry || "");
  const [email, setEmail] = useState(existingEmail || "");
  const [website, setWebsite] = useState(existingWebsite || "");
  const [phone, setPhone] = useState(existingPhone || "");
  const [location, setLocation] = useState(existingLocation || "");
  const [universitytype, setUniversitytype] = useState(
    existingUniversitytype || ""
  );
  const [images, setImages] = useState(existingImages || []);
  const [status, setStatus] = useState(existingStatus || "");
  const [colleges, setColleges] = useState(existingColleges || []);

  const [isUploading, setIsUpLoading] = useState(false);

  function addCollege() {
    setColleges([...colleges, { name: "", type: "", sector: "" }]);
  }

  function updateCollege(index, field, value) {
    const updatedColleges = [...colleges];
    updatedColleges[index][field] = value;
    setColleges(updatedColleges);
  }

  function removeCollege(index) {
    const updatedColleges = colleges.filter((_, i) => i !== index);
    setColleges(updatedColleges);
  }

  async function createUnversity(ev) {
    ev.preventDefault();

    if (!name.trim() || !status.trim()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة!");
      return;
    }

    const data = {
      name,
      country,
      email,
      website,
      phone,
      location,
      universitytype,
      images,
      status,
      colleges,
    };

    try {
      if (_id) {
        await axios.put("/api/universities", { ...data, _id });
        toast.success("تم تحديث الجامعة بنجاح");
      } else {
        await axios.post("/api/universities", data);
        toast.success("تم إنشاء الجامعة بنجاح");
      }
      setRedirect(true);
    } catch (error) {
      console.error(
        "خطأ أثناء حفظ بيانات الجامعة:",
        error.response?.data || error.message
      );
      toast.error("حدث خطأ أثناء حفظ بيانات الجامعة.");
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
    router.push("/universities");
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

  return (
    <>
      <form
        className="bg-gray-100 shadow-lg rounded-2xl p-6 addWebsiteform"
        onSubmit={createUnversity}
      >
        {/* Unversity Name */}
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="name" className="text-gray-800 font-semibold w-full">
            اسم الجامعة:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter University Name"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        {/* Unversity Country */}
        <div className="flex flex-col items-start mb-4">
          <label
            htmlFor="country"
            className="text-gray-800 font-semibold w-full"
          >
            دولة الجامعة
          </label>

          <select
            name="country"
            id="country"
            onChange={(ev) => setCountry(ev.target.value)}
            value={country}
            className="p-2 border rounded-md"
          >
            <option value="">🌍 اختر الدولة</option>
            <option value="مصر">🇪🇬 مصر</option>
            <option value="السعودية">🇸🇦 السعودية</option>
            <option value="الإمارات">🇦🇪 الإمارات</option>
            <option value="تركيا">🇹🇷 تركيا</option>
          </select>
        </div>

        {/* Unversity email */}
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="email" className="text-gray-800 font-semibold w-full">
            ايميل الجامعة
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter University Email"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        {/* Unversity Website */}
        <div className="flex flex-col items-start mb-4">
          <label
            htmlFor="website"
            className="text-gray-800 font-semibold w-full"
          >
            ويب سيت الجامعة
          </label>
          <input
            type="text"
            id="website"
            placeholder="Enter University Website"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={website}
            onChange={(ev) => setWebsite(ev.target.value)}
          />
        </div>

        {/* Unversity Phone */}
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="phone" className="text-gray-800 font-semibold w-full">
            تليفون الجامعة
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Enter University Phone"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>

        {/* Unversity Location */}
        <div className="flex flex-col items-start mb-4">
          <label
            htmlFor="location"
            className="text-gray-800 font-semibold w-full"
          >
            موقع الجامعة
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter University Location"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
          />
        </div>

        {/* Unversity universitytype */}
        <div className="flex flex-col items-start mb-4">
          <label
            htmlFor="universitytype"
            className="text-gray-800 font-semibold w-full"
          >
            نوع الجامعة
          </label>
          <select
            name="universitytype"
            id="universitytype"
            onChange={(ev) => setUniversitytype(ev.target.value)}
            value={universitytype}
          >
            <option value="">No select</option>
            <option value="حكومية">حكومية</option>
            <option value="خاصة">خاصة</option>
            <option value="أهلية">أهلية</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="flex flex-col items-start mb-4">
          <label
            htmlFor="images"
            className="text-gray-800 font-semibold w-full "
          >
            Upload University Logo:
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
              <span className="text-gray-500">Click or drag files to logo</span>
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

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="colleges">اضف كلية أو معهد</label>
          {colleges.map((college, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="College Name"
                className="p-2 border border-gray-300 rounded"
                value={college.name}
                onChange={(e) => updateCollege(index, "name", e.target.value)}
              />
              <label className="border-gray-300 text-nowrap" htmlFor="type">
                كلية ام معهد
              </label>
              <select
                name="type"
                id="type"
                onChange={(e) => updateCollege(index, "type", e.target.value)}
                value={college.type}
              >
                <option value="">No select</option>
                <option value="كلية">كلية</option>
                <option value="معهد">معهد عالي</option>
                <option value="معهد">مركز تدريب</option>
              </select>
              <label className="border-gray-300" htmlFor="sector">
                sector
              </label>
              <select
                name="sector"
                id="sector"
                onChange={(e) => updateCollege(index, "sector", e.target.value)}
                value={college.sector}
              >
                <option value="">No select</option>
                <option value="طبي">طبي</option>
                <option value="هندسي">هندسي</option>
                <option value="حاسبات و ملومات">حاسبات و معلومات</option>
                <option value="قانون">قانون</option>
                <option value="تجاري">تجاري</option>
                <option value="تربوي">تربوي</option>
                <option value="علوم">علوم</option>
                <option value="آداب">آداب</option>
                <option value="دراسات إسلامية">دراسات إسلامية</option>
              </select>
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removeCollege(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-2 rounded"
            onClick={addCollege}
          >
            + Add College
          </button>
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            onChange={(ev) => setStatus(ev.target.value)}
            value={status}
          >
            <option value="">No select</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 mt-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 addwebbtn"
        >
          Save University
        </button>
      </form>
    </>
  );
}
