import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { plugin } from "mongoose";
import LoginLayout from "@/components/LoginLayout";

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blog Created Monthly by Year",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const responseproject = await fetch("/api/projects");
        const responseuniversity = await fetch("/api/universities");
        const responseShop = await fetch("api/shops");
        const responseGallery = await fetch("api/photos");
        const data = await response.json();
        const dataProject = await responseproject.json();
        const dataUniversity = await responseuniversity.json();
        const dataShop = await responseShop.json();
        const dataPhotos = await responseGallery.json();

        setBlogsData(data);
        setProjectData(dataProject);
        setUniversityData(dataUniversity);
        setShopData(dataShop);
        setPhotosData(dataPhotos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const monthlyData = universityData
    .filter((dat) => dat.status === "publish")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear();
      const month = new Date(blog.createdAt).getMonth();
      acc[year] = acc[year] || Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    // backgroundColor: "rgba(255,0,0,0.5)",
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`,
  }));

  const data = {
    labels,
    datasets,
  };

  return (
    <LoginLayout>
      <>
        <Head>
          <title>Portfolio Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Admin <span>Dashboard</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <IoHome /> <span>/</span>
              <span>Dashboard</span>
            </div>
          </div>

          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Universities</h2>
              <span>
                {
                  universityData.filter((dat) => dat.status === "publish")
                    .length
                }
              </span>
            </div>
            <div className="four_card">
              <h2>Total Projects</h2>
              <span>
                {projectData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Colleges</h2>
              <span>
                {shopData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Specialties</h2>
              <span>{photosData.length}</span>
            </div>
          </div>

          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">
                  10/ 365 <br /> <span>Total Published </span>
                </h3>
              </div>
              <Bar data={data} options={options} />
            </div>

            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>تخصص 1</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Node Js"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td> تخصص 2</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "React Js"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td> تخصص 2</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Next Js"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>تخصص 3</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Css"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>تخصص 4 </td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Digital Marketing"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>تخصص 5 </td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Flutter Dev"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>تخصص 6</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Database"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>تخصص 7</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Deployment"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td> تخصص 8</td>
                      <td>
                        {
                          blogsData.filter(
                            (dat) => dat.blogcategory[0] === "Next Js"
                          ).length
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </LoginLayout>
  );
}
