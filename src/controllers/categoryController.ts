import { Request, Response } from "express";
import  prisma  from "../lib/prisma";
import { HTTP_STATUS } from "../utils/constants";


// ⭐ Get All Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};


// ⭐ Get Category By ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
    });

    if (!category) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};