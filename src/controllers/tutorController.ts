import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { HTTP_STATUS } from '../utils/constants';

const prisma = new PrismaClient();

export const getTutors = async (req: Request, res: Response) => {
  try {
    const tutors = await prisma.tutorProfile.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    });
    res.json(tutors);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Failed to fetch tutors' });
  }
};

export const getTutorById = async (req: Request, res: Response) => {
  try {
    const tutor = await prisma.tutorProfile.findUnique({
      where: { userId: req.params.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        availability: true
      }
    });
    res.json(tutor);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Failed to fetch tutor' });
  }
};

export const updateTutorProfile = async (req: AuthRequest, res: Response) => {
  try {
    const tutor = await prisma.tutorProfile.update({
      where: { userId: req.user?.id },
      data: req.body
    });
    res.json({ message: 'Profile updated', tutor });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Failed to update profile' });
  }
};

export const updateAvailability = async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Availability updated' });
};

export const getTutorAvailability = async (req: Request, res: Response) => {
  res.json({});
};
