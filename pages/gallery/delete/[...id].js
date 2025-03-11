import axios from "axios";
import Head from "next/head";

import { router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SiBloglovin } from "react-icons/si";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function DeletePhoto() {
  const router = useRouter();

  const { id } = router.query;
  const [photoInfo, setPhotoInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/photos?id=" + id).then((response) => {
        setPhotoInfo(response.data);
      });
    }
  }, [id]);

  function goBack() {
    router.push("/gallery");
  }

  async function deletedBlog() {
    await axios.delete("/api/photos?id=" + id);
    toast.success("delete successfully");
    goBack();
  }
  return (
    <>
      <Head>
        <title>Delete Photo</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{photoInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span> <span>Delete Photo</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <div className=" h-10 w-10 text-red-700 text-6xl font-bold mb-1.5">
              <RiDeleteBin3Line />
            </div>
            <p className="cookieHeading">Are you sure?</p>
            <p className="cookieDescription">
              If you delete website content it will be permenent delete your
              content.
            </p>
            <div className="buttonContainer">
              <button onClick={deletedBlog} className="acceptButton">
                Delete
              </button>
              <button onClick={goBack} className="acceptButton">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
