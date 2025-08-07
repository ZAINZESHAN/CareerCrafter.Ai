import { useContext, useEffect, useState } from "react";
import { Card } from "antd";
import {
  FileTextOutlined,
  SearchOutlined,
  UserOutlined,
  BarChartOutlined,
  BulbOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";
import { toast } from "react-toastify";

const tools = [
  {
    title: "Start your career journey by analyzing your goals and strengths.",
    icon: <BulbOutlined style={{ fontSize: "28px", color: "#1677ff" }} />,
    link: "/goalanalysis",
    heading: "Goal Analysis",
  },
  {
    title: "Create a professional Resume in minutes with AI assistance.",
    icon: <FileTextOutlined style={{ fontSize: "28px", color: "#1677ff" }} />,
    link: "/resumebuilder",
    heading: "Resume Builder",
  },
  {
    title: "Practice real interview questions and get AI feedback.",
    icon: <UserOutlined style={{ fontSize: "28px", color: "#1677ff" }} />,
    link: "/mockinterview",
    heading: "Mock Interview",
  },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);
  const { token, backend_Url } = useContext(AuthContext)

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {

    const fetchCareerPaths = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${backend_Url}/api/career`, {
          headers: { token },
          withCredentials: true,
        })
        setCareerPaths(response.data.careerPaths || []);
      } catch (error) {
        console.error("Error fetching career paths", error);
      }
    }
    fetchCareerPaths();

    const fetchResumes = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${backend_Url}/api/resume`, {
          headers: { token },
          withCredentials: true,
        });
        setResumes(response.data.resumes || []);
      } catch (err) {
        console.error("Error fetching resumes", err);
      }
    };

    fetchResumes();

  }, [token, backend_Url]);


  return (
    <div className="py-12 relative">
      {/* Menu Icon */}
      <button
        className="absolute left-2 top-6 z-20 hover:border hover:bg-gray-200 cursor-pointer hover:border-gray-200 rounded-full text-black text-xl p-2"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Sidebar */}
      <div
        className={classNames(
          "fixed top-20 left-4 sm:left-[5vw] md:left-[7vw] lg:left-[4vw] h-full bg-gray-100 shadow-md z-10 transition-all duration-300 ease-in-out overflow-y-auto",
          {
            "w-[250px]": isSidebarOpen,
            "w-0 overflow-hidden": !isSidebarOpen,
          }
        )}
        style={{
          paddingTop: "20px",
          maxHeight: "calc(100vh - 80px)",
        }}
      >
        <div className="px-4 py-6">
          <h3 className="text-md font-semibold mb-2">📄 Your Resumes</h3>
          <ul className="text-sm space-y-2 mb-6">
            {resumes.length > 0 ? (
              resumes.map((resume) => (
                <li
                  key={resume._id}
                  className="cursor-pointer hover:text-[#1677ff]"
                  onClick={() => navigate(`/resume/${resume._id}`)}
                >
                  {resume.name || "Your Resumes"}
                  <span className="text-xs text-gray-400 ml-22">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No resumes found</li>
            )}
          </ul>

          <h3 className="text-md font-semibold mb-2">📊 Career Analyses</h3>
          <ul className="text-sm space-y-2">
            {careerPaths.length > 0 ? (
              careerPaths.map((career) => (
                <li
                  key={career._id}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/career/${career._id}`)}
                >
                  {career.title || "Career Plan"}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No analyses found</li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={classNames("transition-all duration-300", {
          "ml-[270px]": isSidebarOpen,
          "ml-0": !isSidebarOpen,
        })}
      >
        {/* Dashboard Title */}
        <div className="text-center mb-10">
          <h1 className="text-[25px] sm:text-[30px] font-bold text-black mb-2" style={{ fontWeight: "600" }}>
            Your Career Dashboard
          </h1>
          <p className="text-[14px] sm:text-[16px] text-gray-600 max-w-2xl mx-auto">
            Welcome to CareerCrafter.AI — Here’s your personalized toolkit to plan, prepare, and progress in your career journey.
          </p>
        </div>

        {/* Card Section Heading */}
        <h2 className="text-[21px] sm:text-[25px] font-semibold text-black pb-3 text-center" style={{ fontWeight: "500" }}>
          AI Career Tools
        </h2>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link to={tool.link} key={index}>
              <Card
                hoverable
                className="transition-all duration-500 ease-in-out transform hover:scale-[1.06] rounded-2xl shadow-md hover:shadow-xl min-h-[220px] bg-white hover:bg-[#f0f7ff]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">{tool.icon}</div>
                  <h3 className="text-lg " style={{ fontWeight: "500" }}>{tool.heading}</h3>
                  <p className="text-sm text-gray-600 mt-2 px-2">{tool.title}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
