import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
import userRouter from './Routes/userRoute.js'
import connectDB from './config/mongoDb.js'
import careerRouter from './Routes/careerRoute.js'
import resumeRouter from "./Routes/resume.Route.js";
import MockRouter from "./Routes/mockInterviewRoute.js";

// App Config
const app = express()
const port = process.env.PORT || 4000
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


app.listen(port, () => console.log('Server started on PORT : ' + port))