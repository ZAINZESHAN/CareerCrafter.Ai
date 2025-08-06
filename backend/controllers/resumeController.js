import axios from "axios"
import resumeModel from "../models/resume.Model.js";

// ---- Resume Generator Function ----
const generateResume = async (req, res) => {
    const { name, email, phone, education, experience, skills, projects } = req.body;

    const userId = req.userId;
    const prompt = `
                    You are a professional resume-building AI.
                    Your task is to generate a simple, clean, and professional resume using the user’s information below. Follow these rules:
                    Rules:
                    Keep all sections structured and readable.
                    Always include all sections: Personal Info, Summary, Education, Experience, Skills, and Projects.
                    Highlight section headings.
                    Remove any unnecessary lines or characters.
                    User Info:
                    Name: ${name}
                    Email: ${email}
                    Phone: ${phone}
                    Education: ${education}
                    Experience: ${experience}
                    Skills: ${skills}
                    Projects: ${projects}

                    Resume Structure:
                    Name: ${name}
                    Email: ${email}
                    Phone: ${phone}

                    Professional Summary:
                    A motivated software developer passionate about building modern web applications.
                    Education:
                    ${education}
                    Work Experience:
                    ${experience || "I am a fresher with no formal experience."}
                    Skills:
                    ${skills}
                    Projects:
                    ${projects || "Portfolio Website – Created using React."}

                    Additional Instructions:
                    Ensure the resume is neat and UI-friendly.
                    Remove decorative lines or symbols.`


    try {
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mistral-7b-instruct:free",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const result = response.data.choices[0]?.message?.content || "No resume generated.";

        const saveResume = new resumeModel({
            userId: userId,
            name,
            education,
            experience,
            skills: skills.split(",").map(skill => skill.trim()),
            projects,
            aiResume: result,
        })

        await saveResume.save();
        res.json({ success: true, result });

    } catch (error) {
        console.error("OpenRouter API Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAllResumes = async (req, res) => {
    try {

        const userId = req.userId;
        const getResumes = await resumeModel.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, resumes: getResumes })

    } catch (error) {
        console.log("Error fetching resumes:", error);
        res.status(500).json({ success: false, error: "Failed to fetch resumes." });
    }
}

const deleteResume = async (req, res) => {
    try {

        const resumeId = req.params.id;
        await resumeModel.findByIdAndDelete(resumeId);
        res.json({ success: true, message: "Resume deleted successfully." })

    } catch (error) {
        console.error("Error deleting resume:", error);
        res.status(500).json({ success: false, error: "Failed to delete resume." });
    }
}

export {deleteResume, generateResume, getAllResumes }