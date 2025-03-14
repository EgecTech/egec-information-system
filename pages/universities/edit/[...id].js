// import Blog from "@/components/Blog";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { router, useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { SiBloglovin } from "react-icons/si";
import University from "@/components/University";

export default function EditUniversity() {
  const router = useRouter();

  const { id } = router.query;
  const [universityInfo, setUniversityInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/universities?id=" + id).then((response) => {
        setUniversityInfo(response.data);
      });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update University</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{universityInfo?.name}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span> <span>Edit Blog</span>
          </div>
        </div>
        <div className="mt-3">
          {universityInfo && <University {...universityInfo} />}{" "}
        </div>
      </div>
    </>
  );
}
