import axios from "axios"
import resumeModel from "../models/resume.Model.js";

// ---- Resume Generator Function ----
const generateResume = async (req, res) => {
    const { name, email, phone, education, experience, skills, projects } = req.body;

    const userId = req.userId;
    const prompt = `
You are a professional resume-building AI.

Your task is to generate a simple, clean, and professional resume using the user’s information below. The resume will be displayed in a web application, so follow these strict rules:

Rules:
- Keep all sections structured, aligned, and readable.
- If any field is missing, use relevant default content.
- Keep it concise but effective.
- Always include all sections: Personal Info, Summary, Education, Experience, Skills, and Projects.

User Info:
- Name: ${name || "John Doe"}
- Email: ${email || "johndoe@email.com"}
- Phone: ${phone || "+123456789"}
- Education: ${education || "BSc in Computer Science, XYZ University, 2022"}
- Experience: ${experience || "Junior Developer at ABC Tech (2022–Present). Built and maintained web applications using React and Node.js."}
- Skills: ${skills || "JavaScript, React, Node.js, MongoDB, HTML, CSS"}
- Projects: ${projects || "Portfolio Website – Created a personal portfolio using React. | Chat App – Built a real-time chat app using Socket.io."}

==============================
Name: ${name || "John Doe"}
Email: ${email || "johndoe@email.com"}
Phone: ${phone || "+123456789"}
==============================

Professional Summary:
A motivated and skilled software developer with experience in building modern web applications. Passionate about learning new technologies and delivering high-quality work in collaborative environments.

Education:
${education || "BSc in Computer Science, XYZ University, 2022"}

Work Experience:
${experience || "Junior Developer at ABC Tech (2022–Present). Built and maintained web applications using React and Node.js."}

Skills:
${skills || "JavaScript, React, Node.js, MongoDB, HTML, CSS"}

Projects:
${projects || "Portfolio Website – Created a personal portfolio using React. | Chat App – Built a real-time chat app using Socket.io."}

==============================
Make sure the above resume looks neat, readable, and UI-friendly with proper line breaks and spacing.
`;

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
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

        // Save to MangoDB
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

export default generateResume