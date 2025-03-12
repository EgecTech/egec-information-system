// import Dataloading from "@/components/Dataloading";
// import useFetchData from "@/hooks/useFetchData";
// import Link from "next/link";
// import { useState } from "react";
// import { FaUniversity } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";

// export default function Universities() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage] = useState(7);
//   const [searchQuery, setSearchQuery] = useState("");

//   const { data: allData, loading } = useFetchData("/api/universities");

//   const paginate = (pageNumbers) => {
//     setCurrentPage(pageNumbers);
//   };

//   const filteredUniversities =
//     searchQuery.trim() === ""
//       ? allData
//       : allData.filter((university) =>
//           university.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//   const allUniversities = filteredUniversities.length;
//   const indexOfFirstUniversity = (currentPage - 1) * perPage;
//   const indexOfLastUniversity = currentPage * perPage;
//   const currentUniversities = filteredUniversities.slice(
//     indexOfFirstUniversity,
//     indexOfLastUniversity
//   );

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(allUniversities / perPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <>
//       <div className="universityPage">
//         <div className="titledashboard flex flex-sb">
//           <div>
//             <h2>
//               All Registered <span>Universities</span>
//             </h2>
//             <h3>ADMIN PANEL</h3>
//           </div>
//           <div className="breadcrumb">
//             <FaUniversity /> <span>/</span>
//             <span>Add University</span>
//           </div>
//         </div>
//         <div className="universityTable">
//           <div className="flex gap-2 mb-1">
//             <h2>Search Universities:</h2>
//             <input
//               type="text"
//               placeholder="Search by name..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
//             <thead className="bg-gray-200 text-gray-700 text-left">
//               <tr className="border-b border-gray-300">
//                 <th className="px-5 py-3 text-center w-12">#</th>
//                 <th className="px-5 py-3 text-center">Logo</th>
//                 <th className="px-5 py-3">Name</th>
//                 <th className="px-5 py-3">Country</th>
//                 <th className="px-5 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-300">
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-6">
//                     <Dataloading />
//                   </td>
//                 </tr>
//               ) : currentUniversities.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-6 text-gray-500">
//                     No Universities Found
//                   </td>
//                 </tr>
//               ) : (
//                 currentUniversities.map((university, index) => (
//                   <tr
//                     key={university._id}
//                     className="hover:bg-gray-100 transition duration-200"
//                   >
//                     <td className="px-5 py-4 text-center font-medium text-gray-700">
//                       {indexOfFirstUniversity + index + 1}
//                     </td>
//                     <td className="px-5 py-4 text-center">
//                       <img
//                         src={university.logo}
//                         alt={university.name}
//                         className="w-16 h-16 object-cover rounded-md shadow-sm"
//                       />
//                     </td>
//                     <td className="px-5 py-4 text-gray-800 font-semibold">
//                       {university.name}
//                     </td>
//                     <td className="px-5 py-4 text-gray-700">
//                       {university.country}
//                     </td>
//                     <td className="px-5 py-4 text-center">
//                       <div className="flex justify-center space-x-3">
//                         <Link href={`/universities/edit/${university._id}`}>
//                           <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm flex items-center">
//                             <FaEdit className="mr-1" /> Edit
//                           </button>
//                         </Link>
//                         <Link href={`/universities/delete/${university._id}`}>
//                           <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm flex items-center">
//                             <RiDeleteBin6Fill className="mr-1" /> Delete
//                           </button>
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//           {currentUniversities.length === 0 ? (
//             ""
//           ) : (
//             <div className="pagination">
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               {pageNumbers
//                 .slice(
//                   Math.max(currentPage - 3, 0),
//                   Math.min(currentPage + 2, pageNumbers.length)
//                 )
//                 .map((number) => (
//                   <button
//                     key={number}
//                     onClick={() => paginate(number)}
//                     className={`${currentPage === number ? "active" : ""}`}
//                   >
//                     {number}
//                   </button>
//                 ))}
//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentUniversities.length < perPage}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Universities() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allData, loading } = useFetchData("/api/universities");

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  // تصفية البيانات بناءً على البحث
  const filteredUniversities =
    searchQuery.trim() === ""
      ? allData
      : allData.filter((university) =>
          university.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // حساب عدد المدونات بعد التصفية
  const allUniversity = filteredUniversities.length;

  // تحديد المدونات لعرضها في الصفحة الحالية
  const indexOfFirstUniversity = (currentPage - 1) * perPage;
  const indexOfLastUniversity = currentPage * perPage;
  const currentUniversities = filteredUniversities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );

  // تصفية المدونات المنشورة فقط
  const publishedUniversities = currentUniversities.filter(
    (ab) => ab.status === "publish"
  );

  // إنشاء أرقام الصفحات
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allUniversity / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Published <span>Universities</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span>
            <span>AddUniversities</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Universities:</h2>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-left">
              <tr className="border-b border-gray-300">
                {/* <th className="px-5 py-3 text-center w-12">#</th>
                <th className="px-5 py-3 text-center">Image</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3 text-center">Actions</th> */}

                <th className="px-5 py-3 text-center w-12">#</th>
                <th className="px-5 py-3 text-center">Logo</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    <Dataloading />
                  </td>
                </tr>
              ) : publishedUniversities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No Universities Found
                  </td>
                </tr>
              ) : (
                publishedUniversities.map((university, index) => (
                  <tr
                    key={university._id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-5 py-4 text-center font-medium text-gray-700">
                      {indexOfFirstUniversity + index + 1}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <img
                        src={university.logo}
                        alt={university.name}
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                    </td>
                    <td className="px-5 py-4 text-gray-800 font-semibold">
                      {university.name}
                    </td>
                    <td className="px-5 py-4 text-gray-800 font-semibold">
                      {university.country}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex justify-center space-x-3">
                        <Link href={`/universities/edit/${university._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm flex items-center">
                            <FaEdit className="mr-1" /> Edit
                          </button>
                        </Link>
                        <Link href={`/universities/delete/${university._id}`}>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm flex items-center">
                            <RiDeleteBin6Fill className="mr-1" /> Delete
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {publishedUniversities.length === 0 ? (
            ""
          ) : (
            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${currentPage === number ? "active" : ""}`}
                  >
                    {number}
                  </button>
                ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentUniversities.length < perPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
