import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Popconfirm, Typography, Input, Row, Col, } from "antd";
import { DeleteOutlined, PlusOutlined, DownloadOutlined, SearchOutlined, } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const { Title, Text } = Typography;

const Career = () => {
  const { token, backend_Url } = useContext(AuthContext);
  const [careerPaths, setCareerPaths] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareerPaths = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${backend_Url}/api/career`, { headers: { token }, withCredentials: true, });
        setCareerPaths(response.data.careerPaths || []);
      } catch (err) {
        console.error("Error fetching career path", err);
      }
    };
    fetchCareerPaths();
  }, [token]);

  const handleDelete = async (careerId) => {
    try {

      const response = await axios.delete(`${backend_Url}/api/career/delete/${careerId}`, { headers: { token }, withCredentials: true })
      if (response.data.success) {
        setCareerPaths(careerPaths.filter((careerPath) => careerPath._id !== careerId))
        toast.success("Career path deleted successfully.");
      }
      else {
        toast.error("Failed to delete Career Path.");
      }

    } catch (error) {
      console.log(error)
      error.response?.data?.error
    }
  }

  const handleDownload = (careerPaths) => {
    const element = document.createElement("a");
    const file = new Blob([careerPaths.suggestion || "No data"], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `Career Path.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredCareer = careerPaths.filter((careerPath) =>
    careerPath.suggestion.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Title level={2}>Your Career Paths</Title>
        <div className="flex gap-3">
          <Input
            placeholder="Search career path by name..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            className="w-60"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/goalanalysis")}
          >
            New Career Path
          </Button>
        </div>
      </div>

      {filteredCareer.length === 0 ? (
        <Text type="secondary">
          No career path found. Click "New Career Path" to create one.
        </Text>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredCareer.map((careerPaths) => (
            <Col
              key={careerPaths._id}
              xs={24}
              sm={24}
              md={24}
              lg={24}
            >
              <Card
                extra={
                  <Text type="secondary">
                    {new Date(careerPaths.createdAt).toLocaleDateString()}
                  </Text>
                }
                actions={[
                  <DownloadOutlined
                    key="download"
                    title="Download"
                    onClick={() => handleDownload(careerPaths)}
                    style={{ fontSize: '20px' }}
                  />,
                  <Popconfirm
                    title="Are you sure to delete this careerPaths?"
                    onConfirm={() => handleDelete(careerPaths._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined key="delete" title="Delete" style={{ fontSize: '20px' }} />
                  </Popconfirm>,
                ]}
              >
                <Text>
                  {expandedIds.includes(careerPaths._id) ? (
                    <div className="career-content prose max-w-full text-base prose-blue">
                      <ReactMarkdown children={careerPaths.suggestion || "No summary available."} />
                    </div>
                  ) : (
                    <ReactMarkdown children={careerPaths.suggestion.split(" ").slice(0, 100).join(" ") + "..."} />
                  )}
                </Text>

                <Button
                  type="link"
                  onClick={() => toggleExpand(careerPaths._id)}
                  style={{ paddingLeft: 0 }}
                >
                  {expandedIds.includes(careerPaths._id) ? "View Less" : "View More"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )
      }
    </div >
  );
}

export default Career
