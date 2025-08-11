import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/mongodb.js';
import express from 'express';
import cors from 'cors';
import userRouter from './Routes/userRoute.js';
import careerRouter from './Routes/careerRoute.js';
import resumeRouter from "./Routes/resume.Route.js";
import MockRouter from "./Routes/mockInterviewRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB();

// Middleware
app.use(express.json());

// CORS Configuration

    app.use(cors({
        origin: [
            "https://career-crafter-ai-pmv6.vercel.app",
            "http://localhost:5173"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "token"],
        credentials: true
    }));

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/career', careerRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/mock', MockRouter);

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT : ${port}`));
