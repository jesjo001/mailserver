import { Request, Response } from 'express';
import { Message } from '../models/Message';

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const totalCount = await Message.countDocuments({
      recipient: req.user.username
    });

    const unreadCount = await Message.countDocuments({
      recipient: req.user.username,
      isRead: false
    });

    res.json({
      totalMessages: totalCount,
      unreadMessages: unreadCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};