import express from "express";
import { deleteResume, generateResume, getAllResumes } from "../controllers/resumeController.js";
import authUser from "../middleware/authUser.js";

const resumeRouter = express.Router();

resumeRouter.post('/generate', authUser, generateResume)
resumeRouter.get('/', authUser, getAllResumes)
resumeRouter.delete('/delete/:id', authUser, deleteResume)

export default resumeRouter;