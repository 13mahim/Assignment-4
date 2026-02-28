export const ROLES = {
  STUDENT: 'STUDENT',
  TUTOR: 'TUTOR',
  ADMIN: 'ADMIN'
} as const;

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  ACCOUNT_INACTIVE: 'Account is deactivated. Please contact admin.',
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Insufficient permissions',
  TOKEN_INVALID: 'Invalid token',
  TOKEN_EXPIRED: 'Token expired',
  BOOKING_NOT_FOUND: 'Booking not found',
  TUTOR_NOT_FOUND: 'Tutor not found',
  SLOT_BOOKED: 'Time slot already booked',
  INVALID_STATUS: 'Invalid status transition'
} as const;
