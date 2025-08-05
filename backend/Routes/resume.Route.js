import express from "express";
import generateResume from "../controllers/resumeController.js";
import authUser from "../middleware/auth.js";

const resumeRouter = express.Router();

resumeRouter.post('/generate', authUser, generateResume)

export default resumeRouter;