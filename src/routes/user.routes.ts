import express from 'express';
import { protect } from '../middleware/auth';
import { getCurrentUser, getUserStats } from '../controllers/user.controller';

const router = express.Router();

router.use(protect);

router.get('/me', getCurrentUser);
router.get('/me/stats', getUserStats);

export default router;