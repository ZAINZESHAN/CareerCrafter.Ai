import React from "react";
import { Button, Card, Col, Row, Divider } from "antd";
import {
  BulbOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SearchOutlined,
  LineChartOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import hero_img_2 from '../assets/hero_img_2.avif'

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCardClick = (path) => {
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      title: "Career Goal Analyzer",
      description:
        "Get AI-powered insights to align your goals with trending career paths.",
      icon: <BulbOutlined style={{ fontSize: "28px", color: "#1890ff" }} />,
      path: "/goalanalysis",
    },
    {
      title: "Resume Builder",
      description:
        "Build ATS-friendly resumes within minutes using intelligent templates.",
      icon: <FileTextOutlined style={{ fontSize: "28px", color: "#1890ff" }} />,
      path: "/resume-builder",
    },
    {
      title: "Mock Interviews",
      description:
        "Practice with AI-generated interview questions and get instant feedback.",
      icon: <BarChartOutlined style={{ fontSize: "28px", color: "#1890ff" }} />,
      path: "/mock-interview",
    },
  ];

  const steps = [
    {
      title: "Step 1: Sign Up",
      description: "Create your free account to access personalized tools.",
      icon: <UserAddOutlined />,
    },
    {
      title: "Step 2: Choose a Tool",
      description: "Select from analyzers, resume builder, or interview prep.",
      icon: <AppstoreAddOutlined />,
    },
    {
      title: "Step 3: Get AI Assistance",
      description:
        "Receive smart guidance, recommendations, and feedback instantly.",
      icon: <RocketOutlined />,
    },
  ];

  return (
    <div>
      {/* Hero Section with Blur and Overlay */}
      <div style={{ position: "relative", height: "80vh", marginTop: "10px", overflow: "hidden", borderRadius: "12px" }}>
        <img
          src={hero_img_2}
          alt="Career Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(0px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <h1 className="text-[30px] md:text-[40px] lg:text-[50px] " style={{ fontWeight: "bold" }}>
            Craft Your Career with AI
          </h1>
          <p className="text-[15px] md:text-[20px] lg:text-[22px]" style={{ maxWidth: 700, marginTop: "20px" }}>
            Plan your path, build resumes, and prepare for success — all powered by AI.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(token ? "/dashboard" : "/login")}
            style={{ marginTop: 20 }}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px 0px", textAlign: "center" }}>
        {/* Why Choose */}
        <Divider orientation="center">
          <h2 className="text-[20px] sm:text-[25px] md:text-[30px]" style={{ fontWeight: "600", marginBottom: 0 }}>
            Why Choose CareerCrafter?
          </h2>
        </Divider>
        <p className="text-[14px] md:text-[16px]" style={{ color: "#444" }}>
          Whether you're a student, fresher, or professional, CareerCrafter.AI
          offers a unique blend of tools designed to help you grow. From goal
          clarity to resume perfection — we’ve built everything with AI to make
          career planning easier than ever.
        </p>

        {/* Features */}
        <Divider style={{ marginTop: 60, paddingLeft: "0px" }}>
          <h2 className="text-[18px] sm:text-[24px] md:text-[28px]" style={{ fontWeight: "600", marginBottom: 0 }}>
            Explore Our Tools
          </h2>
        </Divider>
        <Row gutter={[24, 24]}>
          {features.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{ textAlign: "center", borderRadius: "12px" }}
                onClick={() => handleCardClick(item.path)}
              >
                {item.icon}
                <h3 style={{ marginTop: 12, fontSize: "17px", fontWeight: "600" }}>{item.title}</h3>
                <p style={{ color: "#777" }}>{item.description}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* How it Works */}
        <Divider style={{ marginTop: 60 }}>
          <h2 className="text-[18px] sm:text-[24px] md:text-[28px]" style={{ fontWeight: "600", marginBottom: 0 }}>
            How It Works
          </h2>
        </Divider>
        <Row gutter={[24, 24]}>
          {steps.map((step, index) => (
            <Col key={index} xs={24} sm={8}>
              <div
                style={{
                  textAlign: "center",
                  background: "#f0f5ff",
                  padding: "30px 15px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    background: "#1890ff",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    color: "white",
                  }}
                >
                  {step.icon}
                </div>
                <h3 style={{ marginTop: 16 }}>{step.title}</h3>
                <p style={{ color: "#555" }}>{step.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
