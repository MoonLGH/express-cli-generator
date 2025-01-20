import express from 'express';
import { getUser } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/profile', authenticate, getUser);

export default router;
