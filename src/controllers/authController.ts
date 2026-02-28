import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma'; // ✅ THIS MUST BE ACTIVE
import { AuthRequest } from '../middleware/auth';
import { ERROR_MESSAGES, HTTP_STATUS } from '../utils/constants';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ERROR_MESSAGES.USER_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'STUDENT'
      }
    });

    if (role === 'TUTOR') {
      await prisma.tutorProfile.create({
        data: {
          userId: user.id,
          title: 'New Tutor',
          bio: 'Add your bio here',
          hourlyRate: 0,
          phone: '',
          education: 'Add your education',
          experience: 0,
          subjects: []
        }
      });
    } else if (role === 'STUDENT') {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          phone: '',
          bio: '',
          subjects: []
        }
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    if (!user.isActive) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ error: ERROR_MESSAGES.ACCOUNT_INACTIVE });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Login failed' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      include: {
        studentProfile: true,
        tutorProfile: {
          include: {
            availability: true
          }
        }
      }
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const { password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Failed to get user' });
  }
};
