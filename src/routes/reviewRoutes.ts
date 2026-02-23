import { Router } from 'express';
import {
  createReview,
  getTutorReviews,
  updateReview,
  deleteReview
} from '../controllers/reviewController';
import { authenticate, authorize } from '../middleware/auth';
import { reviewValidation } from '../middleware/validation';

const router = Router();

router.get('/tutor/:tutorId', getTutorReviews);
router.use(authenticate);
router.post('/', authorize('STUDENT'), reviewValidation, createReview);
router.put('/:id', authorize('STUDENT'), updateReview);
router.delete('/:id', authorize('STUDENT', 'ADMIN'), deleteReview);

export default router;
