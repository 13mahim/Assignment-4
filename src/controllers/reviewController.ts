import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { HTTP_STATUS } from '../utils/constants';

export const createReview = async (req: AuthRequest, res: Response) => {
  res.status(HTTP_STATUS.CREATED).json({ message: 'Review created' });
};

export const getTutorReviews = async (req: Request, res: Response) => {
  res.json({ reviews: [], averageRating: 0, totalReviews: 0 });
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Review updated' });
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Review deleted' });
};
