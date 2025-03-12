// import UniversityForm from "@/components/UniversityForm";
import University from "@/components/University";
// import UniversityForm from "@/components/University";
import { FaUniversity } from "react-icons/fa";

export default function AddUniversity() {
  return (
    <>
      <div className="adduniversitypage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Add <span>University</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaUniversity /> <span>/</span> <span>Add University</span>
          </div>
        </div>
        <div className="universityadd">
          <University />
        </div>
      </div>
    </>
  );
}
