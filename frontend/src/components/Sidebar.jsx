// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, resumes, careerPaths, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-20 left-4 sm:left-[5vw] md:left-[7vw] lg:left-[4vw] 
                  bg-gray-100 shadow-md z-10 transition-all duration-300 ease-in-out
                  overflow-y-auto rounded-lg
                  ${isOpen ? "w-[250px]" : "w-0 overflow-hidden"}`}
      style={{
        paddingTop: "20px",
        height: "88vh", // 90% of viewport height
      }}
    >
      <div className="px-4 py-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={toggleSidebar}
        >
          ✖
        </button>

        {/* Resumes Section */}
        <h3 className="text-md font-semibold mb-2">📄 Your Resumes</h3>
        <ul className="text-sm space-y-2 mb-6">
          {resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <li
                key={resume._id}
                className="cursor-pointer hover:text-[#1677ff]"
                onClick={() => navigate(`/resume/${resume._id}`)}
              >
                {index + 1} Resume
                <span className="text-xs text-gray-400 ml-24">
                  {new Date(resume.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No resumes found</li>
          )}
        </ul>

        {/* Career Analysis Section */}
        <h3 className="text-md font-semibold mb-2">📊 Career Analyses</h3>
        <ul className="text-sm space-y-2">
          {careerPaths.length > 0 ? (
            careerPaths.map((career, index) => (
              <li
                key={career._id}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate(`/career/${career._id}`)}
              >
                {index + 1} Plan
                <span className="text-xs text-gray-400 ml-30">
                  {new Date(career.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No analyses found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
