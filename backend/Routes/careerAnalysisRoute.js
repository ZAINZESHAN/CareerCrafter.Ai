import express from 'express';
import analyzeCareer from '../controllers/careerAnalysisController.js';

const careerRouter = express.Router();

careerRouter.post('/analyze', analyzeCareer);

export default careerRouter
