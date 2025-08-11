import express from 'express';
import { generateInterviewQuestions, submitInterviewAnswers } from '../controllers/mockInterviewController.js';
import authUser from "../middleware/authUser.js";


const MockRouter = express.Router();

MockRouter.post('/interview', generateInterviewQuestions)
MockRouter.post('/submit', submitInterviewAnswers)

export default MockRouter;