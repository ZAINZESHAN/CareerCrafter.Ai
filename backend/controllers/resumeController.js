import axios from "axios"
import resumeModel from "../models/resume.Model.js";

// ---- Resume Generator Function ----
const generateResume = async (req, res) => {
    const { name, email, phone, education, experience, skills, projects } = req.body;

    const userId = req.userId;
    const prompt = `
You are a professional resume-building AI for a modern career website.
Your task is to generate a clean, professional, and well-structured resume from the given user data.

### Rules:
1. Always use clear section headings (e.g., **Education**, **Skills**) — bold them for highlight.
2. Show data exactly as provided by the user. Do NOT add any extra sample text unless instructed.
3. No unnecessary symbols, lines, or decorative characters.
4. Keep spacing minimal and consistent.
5. Order of sections must be: Personal Information → Professional Summary → Education → Work Experience → Skills → Projects.
6. If Work Experience or Projects is empty, add a short, professional 2–3 line statement for a fresher.
7. For Skills, Projects, and Experience, if data is provided, write them in concise, professional 2–3 lines each.

---

### User Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
Education: ${education}
Work Experience: ${experience}
Skills: ${skills}
Projects: ${projects}

---

### Output Format:

**Personal Information**
Name: ${name}  
Email: ${email}  
Phone: ${phone}

**Professional Summary**
A motivated and detail-oriented professional eager to contribute skills and learn in a dynamic environment.

**Education**
${education}

**Work Experience**
${experience && experience.trim() !== ""
            ? experience
            : "Fresher – Ready to take on challenging roles and grow in the industry."
        }

**Skills**
${skills && skills.trim() !== ""
            ? skills
            : "Quick learner, adaptable, and eager to acquire new skills."
        }

**Projects**
${projects && projects.trim() !== ""
            ? projects
            : "Portfolio Website – Built as a personal learning project."
        }
`;


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

export { deleteResume, generateResume, getAllResumes }