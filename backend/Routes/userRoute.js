import express from 'express'
import { login, profile, registerUser } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', login)
userRouter.get('/profile', authUser, profile)

export default userRouter