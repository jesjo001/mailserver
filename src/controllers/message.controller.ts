import { Request, Response } from 'express';
import { Message } from '../models/Message';
import { validateMessage } from '../utils/validation';
import { User } from '../models/User';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({
      recipient: req.user.email
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      recipient: req.user.email
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { error } = validateMessage(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const recipient = req.body.recipient;
    const senderUserName = req.user.username;

    const recipentUser = await User.findOne({ email: recipient });
    const message = new Message({
      ...req.body,
      sender: req.user.email,
      senderUserName
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: req.user.email
      },
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user.email
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};