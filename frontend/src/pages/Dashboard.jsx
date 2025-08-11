import { useContext, useEffect, useState } from "react";
import { Card } from "antd";
import Sidebar from "../components/Sidebar"
import {
  FileTextOutlined,
  BulbOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);
  const { token, backend_Url } = useContext(AuthContext);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (!token) return;

    const fetchCareerPaths = async () => {
      try {
        const response = await axios.get(`${backend_Url}/api/career`, {
          headers: { token },
          withCredentials: true,
        });
        setCareerPaths(response.data.careerPaths || []);
      } catch (error) {
        console.error("Error fetching career paths", error);
      }
    };

    const fetchResumes = async () => {
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

    fetchCareerPaths();
    fetchResumes();
  }, [token, backend_Url]);

  return (
    <div className="py-12 relative">
      <button
        className="absolute left-0 top-6 z-20 hover:border hover:bg-gray-200 cursor-pointer 
                   hover:border-gray-200 rounded-full text-black p-2"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? null : <MenuOutlined style={{ fontSize: "20px" }} />}
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        resumes={resumes}
        careerPaths={careerPaths}
        toggleSidebar={toggleSidebar}
      />

      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-[270px]" : "ml-0"}`}>
        <div className="text-center mb-10">
          <h1 className="text-[25px] sm:text-[30px] font-bold text-black mb-2">
            Your Career Dashboard
          </h1>
          <p className="text-[14px] sm:text-[16px] text-gray-600 max-w-2xl mx-auto">
            Welcome to CareerCrafter.AI — Here’s your personalized toolkit to
            plan, prepare, and progress in your career journey.
          </p>
        </div>

        <h2 className="text-[21px] sm:text-[25px] font-semibold text-black pb-3 text-center">
          AI Career Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link to={tool.link} key={index}>
              <Card
                hoverable
                className="transition-all duration-500 ease-in-out transform hover:scale-[1.06] 
                           rounded-2xl shadow-md hover:shadow-xl min-h-[220px] bg-white hover:bg-[#f0f7ff]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">{tool.icon}</div>
                  <h3 className="text-lg font-medium">{tool.heading}</h3>
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
