import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HTTP_STATUS } from '../utils/constants';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id }
    });
    if (!category) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error: 'Failed to fetch category' });
  }
};
