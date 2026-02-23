import { Router } from 'express';
import {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getDashboardStats,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);
router.get('/bookings', getAllBookings);
router.get('/stats', getDashboardStats);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
