import React, { useContext, useState } from "react";
import { Input, Button, Card, message } from "antd";
import axios from "axios";
import { AuthContext } from "../context/AuthContect";

const MockInterview = () => {
  const [jobRole, setJobRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const { backend_Url } = useContext(AuthContext);
  const [questionsGenerated, setQuestionsGenerated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateQuestions = async () => {
    setLoading(true);
    setScore(null);
    setIsSubmitted(false);
    try {
      const response = await axios.post(`${backend_Url}/api/mock/interview`, { jobRole });
      setQuestions(response.data.questions);
      setAnswers({});
      setQuestionsGenerated(true);
    } catch (err) {
      message.error("Error generating questions");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const submitAnswers = async () => {
    if (questions.some((_, i) => !answers[i])) {
      return message.warning("Please answer all questions");
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backend_Url}/api/mock/submit`, {
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options,
          answers: q.answer,
        })),
        submittedAnswers: Object.values(answers),
      });
      const total = questions.length;
      const rawScore = response.data.score;
      const percentage = ((rawScore / total) * 100);
      setScore(percentage);
      setIsSubmitted(true);
    } catch (err) {
      message.error("Error evaluating answers");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setQuestions([]);
    setAnswers({});
    setScore(null);
    setQuestionsGenerated(false);
    setJobRole("");
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto sm:px-6 py-6">
      <h1 className="text-[25px] sm:text-[30px] font-semibold mb-8" style={{ fontWeight: "600" }}>Mock Interview</h1>

      {!questionsGenerated && (
        <div className="flex items-center gap-x-2 mb-4">
          <Input
            placeholder="Enter your job role (e.g., Frontend Developer)"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="flex-1"
          />

          <Button
            type="primary"
            onClick={() => {
              if (!jobRole.trim()) {
                message.error("Job role is required");
                return;
              }
              generateQuestions();
            }}
            loading={loading}
          >
            Generate Questions
          </Button>
        </div>
      )}

      {!isSubmitted && questions.map((q, index) => (
        <Card key={index} title={`Question ${index + 1}`} className="mb-4">
          <p>{q.question}</p>
          {Array.isArray(q.options) ? (
            q.options.map((option, optIndex) => (
              <div key={optIndex} className="my-1">
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />{" "}
                  {option}
                </label>
              </div>
            ))
          ) : (
            <p className="text-red-500">⚠️ Invalid options format</p>
          )}
        </Card>
      ))}

      {questionsGenerated && !isSubmitted && (
        <div className="flex justify-end items-center gap-x-2 mb-4">
          <Button danger onClick={reset}>Reset</Button>
          <Button type="primary" onClick={submitAnswers} disabled={loading}>
            Submit Answers
          </Button>
        </div>
      )}


      {
        score !== null && isSubmitted && (
          <div className="flex justify-center mt-4 text-lg font-semibold gap-2 text-green-600">
            <div className="border bg-green-100 border-green-100 p-3 rounded-md">
              <span className="text-black">Your Scored: </span>{score}% 🎯
            </div>
            <Button
              danger
              onClick={reset}
              size="large"
              className="ml-4"
            >
              Reset
            </Button>
          </div>
        )
      }

    </div >
  );
};

export default MockInterview;
