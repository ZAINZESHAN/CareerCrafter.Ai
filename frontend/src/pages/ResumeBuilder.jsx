import React, { useState, useContext, useRef } from "react";
import { Input, Button, Card, Steps } from "antd";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import jsPDF from "jspdf";

const { TextArea } = Input;

const ResumeBuilder = () => {
  const { backend_Url, token } = useContext(AuthContext);
  const resumeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const isCard1Complete = formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
  const isCard2Complete = formData.education.trim() !== "";
  const isCard3Complete = formData.skills.trim() !== "" && formData.experience.trim() !== "";
  const isCard4Complete = formData.projects.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      education: "",
      experience: "",
      skills: "",
      projects: "",
    });
    setCurrentStep(0);
  };

  const generateResume = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backend_Url}/api/resume/generate`,
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        setResult(response.data.result);
        resetForm();
      } else {
        toast.error(response.data.message || "Failed to generate resume.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const resumeContent = resumeRef.current.innerText;
    const lines = doc.splitTextToSize(resumeContent, 180);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(lines, 10, 10);
    doc.save(`${formData.name || "resume"}.pdf`);
  };

  const steps = [
    {
      title: "👤 Personal Details",
      content: (
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="mb-3"
          />
          <Input
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="mb-3"
          />
          <Input
            placeholder="Phone Number"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            className="mb-3"
          />
        </div>
      ),
    },
    {
      title: "🎓 Education",
      content: (
        <TextArea
          rows={3}
          placeholder="Your Educational Background"
          name="education"
          onChange={handleChange}
          value={formData.education}
        />
      ),
    },
    {
      title: "💼 Experience & Skills",
      content: (
        <div className="flex flex-col gap-3">
          <TextArea
            rows={3}
            placeholder="Work Experience (if any)"
            name="experience"
            onChange={handleChange}
            value={formData.experience}
            className="mb-3"
          />
          <TextArea
            rows={3}
            placeholder="Skills (e.g., React, JavaScript, Node.js)"
            name="skills"
            onChange={handleChange}
            value={formData.skills}
          />
        </div>
      ),
    },
    {
      title: "🛠️ Projects",
      content: (
        <>
          <TextArea
            rows={3}
            placeholder="Project titles and short descriptions"
            name="projects"
            onChange={handleChange}
            value={formData.projects}
          />
        </>
      ),
    },
  ];

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-6 px-4">
      <div className="text-center mb-5">
        <h1 className="text-[19px] sm:text-[26px]" style={{ fontWeight: "700" }}>AI Resume Builder</h1>
        <p className="text-gray-600 text-sm sm:text-base pb-8">
          {result
            ? "Here’s your AI-generated resume."
            : "Fill the steps below to create a professional resume."}
        </p>
      </div>

      {!result && (
        <>
          <Steps current={currentStep} size="small" className="mb-4">
            {steps.map((item) => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Card
            title={<div className="font-semibold text-lg mt-6">{steps[currentStep].title}</div>}
            bordered={false}
            className="shadow-lg"
          >
            {steps[currentStep].content}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <Button onClick={prev} className="w-24">
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
                    (currentStep === 1 && !isCard2Complete) ||
                    (currentStep === 2 && !isCard3Complete)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={generateResume}
                  className="w-32"
                  loading={loading}
                  disabled={!isCard4Complete}
                >
                  Generate
                </Button>
              )}
            </div>
          </Card>
        </>
      )}

      {result && (
        <Card
          title="📄 AI-Generated Resume"
          extra={
            <Button type="primary" onClick={downloadPDF}>
              Download PDF
            </Button>
          }
          className="mt-6"
        >
          <div
            ref={resumeRef}
            className="prose max-w-full text-base prose-blue whitespace-pre-wrap"
          >
            <ReactMarkdown
              children={result}
            />
          </div>
        </Card>
      )}
      {result &&
        <div className="mt-4 flex justify-end">
          <Button
            type="primary"

            onClick={() => {
              setResult(null);
              setCurrentStep(0);
              setFormData({
                name: "",
                email: "",
                phone: "",
                education: "",
                experience: "",
                skills: "",
                projects: "",
              });
            }}
          >
            Generate New Resume
          </Button>
        </div>
      }
    </div>
  );
};

export default ResumeBuilder;
