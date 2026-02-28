import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import prisma from "../lib/prisma";
import { HTTP_STATUS } from "../utils/constants";


// ⭐ Create Review
export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { tutorId, bookingId, rating, comment } = req.body;

    const review = await prisma.review.create({
      data: {
        reviewer: {
          connect: { id: userId! },
        },
        tutor: {
          connect: { id: tutorId },
        },
        booking: {
          connect: { id: bookingId },
        },
        rating,
        comment,
      },
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create review",
    });
  }
};


// ⭐ Get Tutor Reviews
export const getTutorReviews = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { tutorId },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    res.json({
      success: true,
      data: {
        reviews,
        averageRating,
        totalReviews,
      },
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};


// ⭐ Update Review
export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview || existingReview.reviewerId !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "You cannot update this review",
      });
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { rating, comment },
    });

    res.json({
      success: true,
      message: "Review updated",
      data: updatedReview,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update review",
    });
  }
};


// ⭐ Delete Review
export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { reviewId } = req.params;

    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview || existingReview.reviewerId !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "You cannot delete this review",
      });
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    res.json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};