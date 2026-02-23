import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: (err as any).param || (err as any).path || 'unknown',
        message: err.msg
      }))
    });
  }
  next();
};

export const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('role').optional().isIn(['STUDENT', 'TUTOR']).withMessage('Role must be either STUDENT or TUTOR'),
  validate
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

export const tutorProfileValidation = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('bio').notEmpty().trim().withMessage('Bio is required'),
  body('hourlyRate').isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('phone').optional().isMobilePhone('any').withMessage('Please provide a valid phone number'),
  body('education').notEmpty().trim().withMessage('Education is required'),
  body('experience').isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('subjects').isArray().withMessage('Subjects must be an array'),
  validate
];

export const bookingValidation = [
  body('tutorId').notEmpty().isString().withMessage('Tutor ID is required'),
  body('date').isISO8601().withMessage('Please provide a valid date'),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Start time must be in HH:MM format'),
  body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('End time must be in HH:MM format'),
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('notes').optional().trim(),
  validate
];

export const reviewValidation = [
  body('bookingId').notEmpty().isString().withMessage('Booking ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim(),
  validate
];
