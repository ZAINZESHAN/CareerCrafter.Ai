import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Spin, message } from "antd";
import { AuthContext } from "../context/AuthContect";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FileTextOutlined, BulbOutlined, LogoutOutlined } from "@ant-design/icons";

const Profile = () => {
  const { backend_Url } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backend_Url}/api/user/profile`, {
        headers: { token },
      });
      setUserData(res.data.user);
    } catch (err) {
      message.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/");
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">

        <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-[#1677ff]">Your Tools</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/career/:careerId" className="flex items-center gap-2 text-gray-700 hover:text-[#1677ff]">
                <BulbOutlined /> View Career Goals
              </Link>
            </li>
            <li>
              <Link to="/resume/:resumeId" className="flex items-center gap-2 text-gray-700 hover:text-[#1677ff]">
                <FileTextOutlined /> View Resumes
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-8 relative">
          <div className="absolute top-4 right-4">
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              size="small"
            >
              Logout
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <h2 className="text-[25px] sm:text-[35px] font-bold text-[#1677ff] mb-2">
                Welcome, {userData?.name} 👋
              </h2>
              <p className="text-gray-600 mb-6">
                View your account details and access powerful tools for career development and resume building.
              </p>

              <Card bordered className="bg-gray-50 border border-gray-200">
                <p className="mb-2">
                  <span className="text-gray-600 font-medium">👤 Name:</span>{" "}
                  <span className="text-[#1890ff] font-semibold">{userData?.name}</span>
                </p>
                <p className="mb-2">
                  <span className="text-gray-600 font-medium">📧 Email:</span>{" "}
                  <span className="text-[#1890ff] font-semibold">{userData?.email}</span>
                </p>
                <p>
                  <span className="text-gray-600 font-medium">📅 Joined:</span>{" "}
                  <span className="text-[#1890ff] font-semibold">{formatDate(userData?.createdAt)}</span>
                </p>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
