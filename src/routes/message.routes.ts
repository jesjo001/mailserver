import express from 'express';
import { protect } from '../middleware/auth';
import {
  getMessages,
  getMessage,
  createMessage,
  markAsRead,
  deleteMessage
} from '../controllers/message.controller';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMessages)
  .post(createMessage);

router.route('/:id')
  .get(getMessage)
  .delete(deleteMessage);

router.put('/:id/read', markAsRead);

export default router;