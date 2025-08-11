import React, { useEffect, useState, useContext } from "react";
import {
    Card,
    Button,
    Popconfirm,
    Typography,
    Input,
    Row,
    Col,
} from "antd";
import {
    DeleteOutlined,
    PlusOutlined,
    DownloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const { Title, Text } = Typography;

const Resume = () => {
    const { token, backend_Url } = useContext(AuthContext);
    const [resumes, setResumes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [token]);

    const handleDelete = async (resumeId) => {
        try {

            const response = await axios.delete(`${backend_Url}/api/resume/delete/${resumeId}`, { headers: { token }, withCredentials: true })
            if (response.data.success) {
                setResumes(resumes.filter((resume) => resume._id !== resumeId))
                toast.success("Resume deleted successfully.");
            }
            else {
                toast.error("Failed to delete resume.");
            }

        } catch (error) {
            console.log(error)
            error.response?.data?.error
        }
    }

    const handleDownload = (resume) => {
        const element = document.createElement("a");
        const file = new Blob([resume.aiResume || "No data"], {
            type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        element.download = `${resume.name || "resume"}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const filteredResumes = resumes.filter((resume) =>
        resume.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <Title level={2}>Your Resumes</Title>
                <div className="flex gap-3">
                    <Input
                        placeholder="Search resume by name..."
                        prefix={<SearchOutlined />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        allowClear
                        className="w-60"
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/resumebuilder")}
                    >
                        New Resume
                    </Button>
                </div>
            </div>

            {filteredResumes.length === 0 ? (
                <Text type="secondary">
                    No resumes found. Click "New Resume" to create one.
                </Text>
            ) : (
                <Row gutter={[16, 16]}>
                    {filteredResumes.map((resume) => (
                        <Col
                            key={resume._id}
                            xs={24}
                            sm={24}
                            md={24}
                            lg={24}
                        >
                            <Card
                                title={(resume.name || "Untitled Resume").toUpperCase()}
                                extra={
                                    <Text type="secondary">
                                        {new Date(resume.createdAt).toLocaleDateString()}
                                    </Text>
                                }
                                actions={[
                                    <DownloadOutlined
                                        key="download"
                                        title="Download"
                                        onClick={() => handleDownload(resume)}
                                        style={{ fontSize: '20px' }}
                                    />,
                                    <Popconfirm
                                        title="Are you sure to delete this resume?"
                                        onConfirm={() => handleDelete(resume._id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined key="delete" title="Delete" style={{ fontSize: '20px' }} />
                                    </Popconfirm>,
                                ]}
                            >
                                <div className="career-content prose max-w-full text-base prose-blue">
                                    <ReactMarkdown children={resume.aiResume || "No summary available."} />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Resume;
