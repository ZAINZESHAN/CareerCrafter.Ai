import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
import userRouter from './Routes/userRoute.js'
import connectDB from './config/mongoDb.js'
import careerRouter from './Routes/careerRoute.js'
import resumeRouter from "./Routes/resume.Route.js";
import MockRouter from "./Routes/mockInterviewRoute.js";
import ServerlessHttp from "serverless-http";

// App Config
const app = express()
connectDB()

// Middlewares
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173", // allow frontend
    credentials: true
}))

// Api End points
app.use('/api/user', userRouter)
app.use('/api/career', careerRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/mock', MockRouter)

app.get('/', (req, res) => {
    res.send("Api Working")
})


export const handler = ServerlessHttp(app)