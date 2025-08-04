import axios from "axios";

const analyzeCareer = async (req, res) => {
    const { interests, skills, goals, education, experience, traits } = req.body;

    const prompt = `You are a career planning expert AI. Based on the following user profile, provide a detailed career analysis:

    Interests: ${interests}
    Skills: ${skills}
    Career Goals: ${goals}
    Education: ${education}
    Experience: ${experience}
    Personality Traits: ${traits}

You are an AI career coach helping the user plan their career.

Start with 1–2 short paragraphs that clearly explain what the user can expect from this analysis based on their input.

Output the result in the following format:

1. **Top 3 Career Paths**:
- For each path, explain why it’s suitable for the user.

2. **Career Roadmap for Each Path**:
- Step-by-step journey from beginner to expert.
- Mention courses, certifications, and tools to learn at each step.
- Approximate time required for each stage.

3. **Key Skills to Focus On**:
- Mention both technical and soft skills needed.

4. **Online Learning Resources**:
- Recommend 2–3 free or affordable platforms (YouTube, Coursera, etc.).

5. **Expected Salary Ranges**:
- Entry-level, Mid-level, and Senior roles (based on global or average estimates).

6. **Common Mistakes to Avoid**:
- Tips to stay focused and productive on this career path.

Make the tone friendly and supportive. Avoid complex words. Keep the explanation clear and structured.
`;



    try {
        const response = await axios.post(
            "https://api.together.xyz/v1/chat/completions",
            {
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // You can also try "meta-llama/Llama-3-70b-chat-hf"
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 2000,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const result = response.data.choices[0].message.content;
        res.json({ success: true, result });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export default analyzeCareer;