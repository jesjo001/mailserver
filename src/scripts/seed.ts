import mongoose from 'mongoose';
import { User } from '../models/User';
import { Message } from '../models/Message';
import { connectDB } from '../config/database';
import { logger } from '../utils/logger';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Message.deleteMany({});

    // Create default user
    const defaultUser = await User.create({
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    });

    // Create sample messages
    const sampleMessages = [
      {
        sender: 'system',
        recipient: 'testuser',
        subject: 'Welcome to Mail Inbox',
        content: 'Welcome to your new mail inbox! We hope you enjoy using our service.',
        isRead: true
      },
      {
        sender: 'notifications',
        recipient: 'testuser',
        subject: 'New Feature Alert',
        content: 'We have added new features to your inbox!',
        isRead: false
      },
      // Add more sample messages here...
    ];

    await Message.insertMany(sampleMessages);

    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();