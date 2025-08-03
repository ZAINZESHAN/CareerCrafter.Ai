import express from 'express'
import cors from 'cors'
import userRouter from './Routes/userRoute.js'
import dotenv from 'dotenv'
import connectDB from './config/mongoDb.js'
dotenv.config()

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()

// Middlewares
app.use(express.json())
app.use(cors())

// Api End points
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("Api Working")
})


app.listen(port, () => console.log('Server started on PORT: ' + port))