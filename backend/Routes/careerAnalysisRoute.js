import express from 'express';
import { analyzeCareer, generateResume } from '../controllers/careerAnalysisController.js';

const careerRouter = express.Router();

careerRouter.post('/analyze', analyzeCareer);
careerRouter.post('/generate', generateResume)

export default careerRouter
