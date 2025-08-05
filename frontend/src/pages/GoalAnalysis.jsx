import React, { useState, useContext } from "react";
import { Input, Button, Card, Select } from "antd";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const { TextArea } = Input;
const { Option } = Select;

const GoalAnalysis = () => {
  const { backend_Url } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    interests: "",
    skills: "",
    goals: "",
    education: "",
    experience: "",
    traits: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formVisible, setFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, education: value }));
  };

  const resetForm = () => {
    setFormData({
      interests: "",
      skills: "",
      goals: "",
      education: "",
      experience: "",
      traits: "",
    });
    setFormVisible(false); // hide form after submission
  };

  const analyzeCareer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backend_Url}/api/career/analyze`, formData);
      if (response.data.success) {
        setResult(response.data.result);
        resetForm();
      } else {
        toast.error("AI failed to analyze your career path.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-6 px-0 sm:px-4">
      <div className="mb-4">
        <div className="text-center">
          <h1 className="text-[19px] sm:text-[26px] font-semibold" style={{ fontWeight: "700" }}>Career Goal Analyzer</h1>
          <p className="text-[13px] sm:text-[15px] text-gray-600 pb-1">
            Fill out the form below to receive personalized AI career insights based on your strengths and goals.
          </p>
        </div>

        {!formVisible && (
          <div className="text-right">
            <Button onClick={() => setFormVisible(true)} type="primary">
              Edit Form
            </Button>
          </div>
        )}
      </div>

      {formVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            analyzeCareer();
          }}
        >
          <Card className="mb-2 shadow-sm p-2" >
            <h2 className="text-lg font-semibold mb-3">📋 Personal Information</h2>
            <Select
              placeholder="Select your education level"
              onChange={handleSelectChange}
              className="w-full mb-2"
              value={formData.education || undefined}
              required
            >
              <Option value="Matric">Matric</Option>
              <Option value="Intermediate">Intermediate</Option>
              <Option value="Bachelor">Bachelor</Option>
              <Option value="Master">Master</Option>
              <Option value="PhD">PhD</Option>
            </Select>

            <TextArea
              rows={2}
              placeholder="Personality Traits or Values (e.g., creative, team player)"
              name="traits"
              onChange={handleChange}
              value={formData.traits}
              className="mb-2"
              required
            />
          </Card>

          <Card className="mb-2 shadow-sm p-2">
            <h2 className="text-lg font-semibold mb-3">💼 Professional Background</h2>
            <TextArea
              rows={2}
              placeholder="Your Key Skills"
              name="skills"
              onChange={handleChange}
              value={formData.skills}
              className="mb-2"
              required
            />
            <TextArea
              rows={2}
              placeholder="Work Experience (if any)"
              name="experience"
              onChange={handleChange}
              value={formData.experience}
              className="mb-2"
              required
            />
          </Card>

          <Card className="mb-2 shadow-sm p-2">
            <h2 className="text-lg font-semibold mb-3">💡 Interests & Goals</h2>
            <TextArea
              rows={2}
              placeholder="Your Interests"
              name="interests"
              onChange={handleChange}
              value={formData.interests}
              className="mb-2"
              required
            />
            <TextArea
              rows={2}
              placeholder="Your Career Goals"
              name="goals"
              onChange={handleChange}
              value={formData.goals}
              className="mb-2"
              required
            />
          </Card>
          <div className="flex justify-end">
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              className=" px-6 mt-6 w-full sm:w-auto"
              style={{
                height: "44px",
                marginTop: "15px",
              }}
            >
              Analyze Career Path
            </Button>
          </div>
        </form>
      )}

      {result && (
        <div className="mt-8 bg-blue-50 border border-blue-200 shadow-md rounded-xl">
          <Card
            title={<div className="text-[20px] font-bold text-[#1677ff]">🚀 Career Suggestions</div>}
            bordered={false}
            className="bg-transparent"
            bodyStyle={{ padding: "1.25rem" }}
          >
            <div className="prose max-w-full text-base prose-blue">
              <ReactMarkdown
                children={result}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-xl font-bold text-[#1677ff]" style={{ fontWeight: "600" }} {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-semibold text-[#1677ff]" style={{ fontWeight: "600" }} {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-3 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc ml-5" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal ml-5" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                }}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );

};

export default GoalAnalysis;
