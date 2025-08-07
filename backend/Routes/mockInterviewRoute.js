import express from 'express';
import { generateInterviewQuestions, submitInterviewAnswers } from '../controllers/mockInterviewController.js';

const MockRouter = express.Router();

MockRouter.post('/interview', generateInterviewQuestions)
MockRouter.post('/submit', submitInterviewAnswers)

export default MockRouter;