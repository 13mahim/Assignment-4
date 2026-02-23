import { Router } from 'express';
import {
  getTutors,
  getTutorById,
  updateTutorProfile,
  updateAvailability,
  getTutorAvailability
} from '../controllers/tutorController';
import { authenticate, authorize } from '../middleware/auth';
import { tutorProfileValidation } from '../middleware/validation';

const router = Router();

router.get('/', getTutors);
router.get('/:id', getTutorById);
router.get('/:id/availability', getTutorAvailability);
router.put('/profile', authenticate, authorize('TUTOR'), tutorProfileValidation, updateTutorProfile);
router.put('/availability', authenticate, authorize('TUTOR'), updateAvailability);

export default router;
