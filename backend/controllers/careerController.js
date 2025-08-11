import axios from "axios";
import careerModel from "../models/career.Model.js";

const analyzeCareer = async (req, res) => {
    const { interests, skills, goals, education, experience, traits } = req.body;
    const userId = req.userId

    const prompt = `
You are a professional career advisor. When giving results:
- Write section headings in Markdown bold (e.g., **Heading Name**).
- Use short paragraphs under each heading.
- Avoid unnecessary symbols.
- Keep content clean, professional, and easy to read.

Generate a structured, professional career planning report in plain text (HTML-friendly, no markdown, no special symbols).

User Profile:
- Interests: ${interests}
- Skills: ${skills}
- Career Goals: ${goals}
- Education: ${education}
- Experience: ${experience}
- Personality Traits: ${traits}

Your response must include these sections:

1. Introduction:
A short, supportive introduction (2–3 sentences) explaining how the analysis will help the user.

2. Top 3 Career Paths (Beginner → Intermediate → Advanced order):
List three realistic career roles starting from the most entry-level role, then intermediate, then advanced.
For each, explain why it suits the user's profile based on their validated skills, interests, and goals.

3. Career Roadmap for Each Path:
For each career path, give a step-by-step guide from beginner to expert.
Include specific skills to learn, certifications or courses to take, and an estimated timeline for each stage.

4. Key Skills to Focus On:
Split into Technical Skills and Soft Skills, only including skills relevant to the career paths.

5. Learning Platforms:
Recommend free or affordable resources (e.g., YouTube, Coursera, Udemy) relevant to the skills above.

Rules:
- Ignore irrelevant or false data.
- Do not recommend advanced roles unless the user’s skills/education clearly support them.
- Keep the tone friendly, clear, and inspiring.
- Output must be easy to copy and display in a UI, with line breaks for readability.
`;

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',
            {
                model: "mistralai/mistral-7b-instruct:free",
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://yourdomain.com',
                    'X-Title': 'CareerCrafterAI',
                },
            }
        );

        const result = response.data.choices?.[0]?.message?.content || "No result returned.";

        const saveCareerAnalysis = new careerModel({
            userId: userId,
            goal: goals,
            skills: skills.split(",").map(skill => skill.trim()),
            background: `${education}, ${experience}, ${traits}`,
            suggestion: result,
        })

        await saveCareerAnalysis.save();
        res.json({ success: true, result });

    } catch (error) {
        console.error("OpenRouter API Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAllCareerAnalysis = async (req, res) => {
    try {

        const userId = req.userId;
        const getCareers = await careerModel.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, careerPaths: getCareers })

    } catch (error) {
        console.error("Error fetching career analysis:", error);
        res.status(500).json({ success: false, error: "Failed to fetch career analysis." });
    }
}

const deletecareerAnalysis = async (req, res) => {
    try {

        const careerId = req.params.id;
        await careerModel.findByIdAndDelete(careerId);
        res.json({ success: true, message: "Career analysis deleted successfully." })

    } catch (error) {
        console.error("Error deleting career analysis:", error);
        res.status(500).json({ success: false, error: "Failed to delete career analysis." });
    }
}

export { analyzeCareer, getAllCareerAnalysis, deletecareerAnalysis };
