import { Card } from "antd";
import {
  FileTextOutlined,
  SearchOutlined,
  UserOutlined,
  BarChartOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    title: "Get matched with jobs based on your skills and interests.",
    icon: <SearchOutlined style={{ fontSize: "28px", color: "#1677ff" }} />,
    link: "/jobmatching",
    heading: "Job Matching",
  },
  {
    title: "Practice real interview questions and get AI feedback.",
    icon: <UserOutlined style={{ fontSize: "28px", color: "#1677ff" }} />,
    link: "/mockinterview",
    heading: "Mock Interview",
  },
  {
    title: "Track and improve your skills for better opportunities.",
    icon: <BarChartOutlined style={{ fontSize: "28px", color: "#1677ff" }} />,
    link: "/skilltracker",
    heading: "Skill Tracker",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="py-12">
      {/* Dashboard Title */}
      <div className="text-center mb-10">
        <h1 className="text-[25px] sm:text-[30px] font-bold text-black mb-2" style={{fontWeight: "600"}}>Your Career Dashboard</h1>
        <p className="text-[14px] sm:text-[16px] text-gray-600 max-w-2xl mx-auto">
          Welcome to CareerCrafter.AI — Here’s your personalized toolkit to plan, prepare, and progress in your career journey.
        </p>
      </div>

      {/* Card Section Heading */}
      <h2 className="text-[21px] sm:text-[25px] font-semibold text-black pb-3 text-center" style={{fontWeight: "500"}}>AI Career Tools</h2>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <Link to={tool.link} key={index}>
            <Card
              hoverable
              className="transition-all duration-500 ease-in-out transform hover:scale-[1.06] rounded-2xl shadow-md hover:shadow-xl min-h-[220px] bg-white hover:bg-[#f0f7ff]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">{tool.icon}</div>
                <h3 className="text-lg " style={{fontWeight: "500"}}>{tool.heading}</h3>
                <p className="text-sm text-gray-600 mt-2 px-2">{tool.title}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

     
    </div>
  );
};

export default Dashboard;
