import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { HTTP_STATUS } from '../utils/constants';

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Failed to fetch users' });
  }
};

export const updateUserStatus = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'User status updated' });
};

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  res.json([]);
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  res.json({ overview: {}, recentBookings: [], topTutors: [] });
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  res.status(HTTP_STATUS.CREATED).json({ message: 'Category created' });
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Category updated' });
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Category deleted' });
};