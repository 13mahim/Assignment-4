import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController';
import { authenticate, authorize } from '../middleware/auth';
import { bookingValidation } from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.post('/', authorize('STUDENT'), bookingValidation, createBooking);
router.get('/', getUserBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);
router.post('/:id/cancel', cancelBooking);

export default router;
