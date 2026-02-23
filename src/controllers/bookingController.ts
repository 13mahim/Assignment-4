import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { HTTP_STATUS } from '../utils/constants';

const prisma = new PrismaClient();

export const createBooking = async (req: AuthRequest, res: Response) => {
  res.status(HTTP_STATUS.CREATED).json({ message: 'Booking created' });
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  res.json([]);
};

export const getBookingById = async (req: AuthRequest, res: Response) => {
  res.json({});
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Status updated' });
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Booking cancelled' });
};
