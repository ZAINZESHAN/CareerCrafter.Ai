import axios from "axios";

// ---- Career Analyzer Function ----
const analyzeCareer = async (req, res) => {
    const { interests, skills, goals, education, experience, traits } = req.body;

    const prompt = `You are an advanced AI career advisor.

Using the user's details below, generate a well-structured, professional career planning report that is easy to read in a web interface (HTML-friendly, no markdown or special characters).

User Profile:
- Interests: ${interests}
- Skills: ${skills}
- Career Goals: ${goals}
- Education: ${education}
- Experience: ${experience}
- Personality Traits: ${traits}

Your response should include the following sections with clear headings:

1. Introduction:
A short, supportive introduction (2–3 sentences) explaining how the analysis will help the user.

2. Top 3 Career Paths:
List three recommended career options.
For each, explain why it suits the user's profile.

3. Career Roadmap for Each Path:
Step-by-step guide from beginner to expert.
Mention relevant courses, certifications, or skills to learn.
Include estimated duration for each stage.

4. Key Skills to Focus On:
Split into Technical Skills and Soft Skills.

5. Learning Platforms:
Suggest free or affordable learning resources (YouTube, Coursera, etc.)

6. Salary Expectations:
Mention average salary ranges for Entry, Mid, and Senior levels.

7. Mistakes to Avoid:
List common pitfalls and how to stay on track.

Ensure the content is easy to copy and read in a UI. Keep language friendly, clear, and inspiring. Do not include symbols like "**", "-", or markdown formatting. Use only plain text with line breaks.`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
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
        res.json({ success: true, result });
    } catch (error) {
        console.error("OpenRouter API Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export default analyzeCareer;
