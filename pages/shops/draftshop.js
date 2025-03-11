import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function draftshop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allData, loading } = useFetchData("/api/shops");

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  // تصفية البيانات بناءً على البحث
  const filteredShops =
    searchQuery.trim() === ""
      ? allData
      : allData.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // حساب عدد المدونات بعد التصفية
  const allShop = filteredShops.length;

  // تحديد المدونات لعرضها في الصفحة الحالية
  const indexOfFirstProduct = (currentPage - 1) * perPage;
  const indexOfLastProduct = currentPage * perPage;
  const currentProducts = filteredShops.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // تصفية المدونات المنشورة فقط
  const publishedProducts = currentProducts.filter(
    (ab) => ab.status === "draft"
  );

  // إنشاء أرقام الصفحات
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allShop / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All draft <span>Products</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span>
            <span>Add Product</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Products:</h2>
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
                <th className="px-5 py-3 text-center w-12">#</th>
                <th className="px-5 py-3 text-center">Image</th>
                <th className="px-5 py-3">Title</th>
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
              ) : publishedProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No Products Found
                  </td>
                </tr>
              ) : (
                publishedProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-5 py-4 text-center font-medium text-gray-700">
                      {indexOfFirstProduct + index + 1}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                    </td>
                    <td className="px-5 py-4 text-gray-800 font-semibold">
                      {product.title}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex justify-center space-x-3">
                        <Link href={`/shops/edit/${product._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm flex items-center">
                            <FaEdit className="mr-1" /> Edit
                          </button>
                        </Link>
                        <Link href={`/shops/delete/${product._id}`}>
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
          {publishedProducts.length === 0 ? (
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
                disabled={currentProducts.length < perPage}
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
