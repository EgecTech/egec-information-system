import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinner from "./Spinner";

export default function BlogTwo() {
  return (
    <form className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      {/* Title Field */}
      <div className="mb-4">
        <label htmlFor="title" className="text-gray-700 font-medium">
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Slug Field */}
      <div className="mb-4">
        <label htmlFor="slug" className="text-gray-700 font-medium">
          Slug:
        </label>
        <input
          type="text"
          id="slug"
          placeholder="Enter Slug URL"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Category Select */}
      <div className="mb-4">
        <label htmlFor="category" className="text-gray-700 font-medium">
          Category:
        </label>
        <select
          id="category"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          {[
            "Node Js",
            "React Js",
            "Next Js",
            "CSS",
            "Digital Marketing",
            "Flutter Dev",
            "Database",
            "Deployment",
          ].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <label htmlFor="images" className="text-gray-700 font-medium">
          Upload Images:
        </label>
        <div className="relative w-full border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-indigo-500 transition">
          <input
            type="file"
            id="fileInput"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            multiple
          />
          <FaCloudUploadAlt className="text-indigo-500 text-4xl mb-2" />
          <span className="text-gray-600 text-sm">
            Click or drag files to upload
          </span>
        </div>
        <div className="mt-2">
          <Spinner />
        </div>
      </div>

      {/* Blog Content Editor */}
      <div className="mb-4">
        <label htmlFor="description" className="text-gray-700 font-medium">
          Blog content (For images: upload first, copy link, and paste in{" "}
          <code className="bg-gray-200 px-1 rounded">![alt text](link)</code>)
        </label>
        <MarkdownEditor
          style={{ width: "100%", height: "400px" }}
          renderHTML={(text) => (
            <ReactMarkdown
              components={{
                code: ({ inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return inline ? (
                    <code className="bg-gray-200 px-1 rounded">{children}</code>
                  ) : (
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-auto">
                        <code>{children}</code>
                      </pre>
                      <button
                        className="absolute top-2 right-2 bg-gray-700 text-white text-sm px-2 py-1 rounded-md hover:bg-gray-600 transition"
                        onClick={() =>
                          navigator.clipboard.writeText(children?.[0] || "")
                        }
                      >
                        Copy
                      </button>
                    </div>
                  );
                },
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
      >
        Publish Article
      </button>
    </form>
  );
}
