import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Spin, message } from "antd";
import { AuthContext } from "../context/AuthContect";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FileTextOutlined,
  BulbOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Profile = () => {
  const { logout, backend_Url } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <Card
        className="w-full max-w-3xl rounded-xl shadow-xl"
        bordered={false}
        bodyStyle={{ padding: '40px' }}
      >
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <UserOutlined className="text-[#1677ff] text-5xl mb-2" />
              <h1 className="text-3xl font-bold text-[#1677ff]">
                Hello, {userData?.name}
              </h1>
              <p className="text-gray-500 mt-2">
                Here's your personalized career dashboard.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="text-lg font-medium">{userData?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-medium">{userData?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Member Since</p>
                <p className="text-lg font-medium">
                  {formatDate(userData?.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button
                  icon={<BulbOutlined />}
                  size="large"
                  className="text-[#1677ff] border-[#1677ff]"
                >
                  View Career Goals
                </Button>
              </Link>
              <Link to="/resume">
                <Button
                  icon={<FileTextOutlined />}
                  size="large"
                  className="text-[#1677ff] border-[#1677ff]"
                >
                  View Resumes
                </Button>
              </Link>
              <Button
                onClick={logout}
                icon={<LogoutOutlined />}
                danger
                size="large"
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Profile;
