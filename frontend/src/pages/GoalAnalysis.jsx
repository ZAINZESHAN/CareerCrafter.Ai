import React, { useState, useContext } from "react";
import { Input, Button, Card, Select, Steps, Spin } from "antd";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const { TextArea } = Input;
const { Option } = Select;

const GoalAnalysis = () => {
  const { backend_Url, token } = useContext(AuthContext);

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
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyze, setIsAnalyze] = useState(false);

  const isCard1Complete = formData.education.trim() !== "" && formData.traits.trim() !== "";
  const isCard2Complete = formData.skills.trim() !== "" && formData.experience.trim() !== "";
  const isCard3Complete = formData.interests.trim() !== "" && formData.goals.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, education: value }));
  };

  const handleAnalyzeCareer = () => {
    setIsAnalyze(true);
  }

  const resetForm = () => {
    setFormData({
      interests: "",
      skills: "",
      goals: "",
      education: "",
      experience: "",
      traits: "",
    });
    setCurrentStep(0);
  };

  const analyzeCareer = async () => {
    setLoading(true);
    handleAnalyzeCareer()
    try {
      const response = await axios.post(
        `${backend_Url}/api/career/analyze`,
        formData,
        { headers: { token: token } }
      );
      if (response.data.success) {
        setResult(response.data.result);
        resetForm();
      } else {
        toast.error(
          response.data.message || "AI failed to analyze your career path."
        );
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "🎓 Education & Traits",
      content: (
        <div className="flex flex-col gap-3">
          <Select
            placeholder="Select your education level"
            onChange={handleSelectChange}
            className="w-full"
            value={formData.education || undefined}
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
          />
        </div>
      ),
    },
    {
      title: "💼 Professional Background",
      content: (
        <div className="flex flex-col gap-3">
          <TextArea
            rows={2}
            placeholder="Your Key Skills"
            name="skills"
            onChange={handleChange}
            value={formData.skills}
            className="mb-3"
            required
          />
          <TextArea
            rows={2}
            placeholder="Work Experience (if any)"
            name="experience"
            onChange={handleChange}
            value={formData.experience}
            required
          />
        </div>
      ),
    },
    {
      title: "💡 Interests & Goals",
      content: (
        <div className="flex flex-col gap-3">
          <TextArea
            rows={2}
            placeholder="Your Interests"
            name="interests"
            onChange={handleChange}
            value={formData.interests}
            className="mb-3"
            required
          />
          <TextArea
            rows={2}
            placeholder="Your Career Goals"
            name="goals"
            onChange={handleChange}
            value={formData.goals}
            required
          />
        </div>
      ),
    },
  ];

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-2xl mx-auto pt-6 px-0 sm:px-4">
      <div className="text-center mb-4">
        <h1
          className="text-[19px] sm:text-[26px] font-semibold"
          style={{ fontWeight: "700" }}
        >
          Career Goal Analyzer
        </h1>
        <p className="text-[13px] sm:text-[15px] text-gray-600 pb-10">
          {result
            ? "Here’s your personalized AI-generated career path based on your details."
            : "Fill the steps below to receive personalized AI career insights based on your strengths and goals."
          }
        </p>
      </div>

      {!result && (
        <Steps current={currentStep} size="small" className="mb-4">
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
      )}

      {!result && (
        <Card
          title={<div className="font-semibold text-lg mt-6">{steps[currentStep].title}</div>}
          bordered={false}
          className="shadow-lg"
        >
          {steps[currentStep].content}

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button onClick={prev} disabled={isAnalyze} className="w-24">
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                onClick={next}
                className="w-24"
                disabled={
                  (currentStep === 0 && !isCard1Complete) ||
                  (currentStep === 1 && !isCard2Complete)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={analyzeCareer}
                className="w-32"
                loading={loading}
                disabled={!isCard3Complete}
              >
                Analyze Career
              </Button>
            )}
          </div>
        </Card>
      )}

      {loading && !result && (
        <div className="text-center mt-6">
          <Spin size="large" />
        </div>
      )}

      {result && (
        <div>
          <div className="mt-8 bg-blue-50 border border-blue-200 shadow-md rounded-xl">
            <Card
              title={
                <div className="text-[20px] font-bold text-[#1677ff] flex items-center gap-2">
                  🚀 Career Suggestions
                </div>
              }
              bordered={false}
              className="career-card shadow-lg rounded-xl border border-gray-200 bg-white"
              bodyStyle={{ padding: "1.25rem" }}
            >
              <div className="career-content prose max-w-full text-base prose-blue">
                <ReactMarkdown children={result} />
              </div>
            </Card>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="primary"

              onClick={() => {
                setResult(null);
                setCurrentStep(0);
                setIsAnalyze(false);
                setFormData({
                  interests: "",
                  skills: "",
                  goals: "",
                  education: "",
                  experience: "",
                  traits: "",
                });
              }}
            >
              Generate New Career Path
            </Button>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default GoalAnalysis;
