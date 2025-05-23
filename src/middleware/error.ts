import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message
  });
};