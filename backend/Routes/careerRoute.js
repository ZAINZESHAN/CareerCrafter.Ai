import express from 'express';
import { analyzeCareer, deletecareerAnalysis, getAllCareerAnalysis } from '../controllers/careerController.js';
import authUser from '../middleware/authUser.js';

const careerRouter = express.Router();

careerRouter.post('/analyze', authUser, analyzeCareer);
careerRouter.get('/', authUser, getAllCareerAnalysis);
careerRouter.delete('/delete/:id', authUser, deletecareerAnalysis);

export default careerRouter
