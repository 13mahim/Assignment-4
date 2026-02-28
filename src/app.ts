import "dotenv/config"; 
import "dotenv/config";
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import tutorRoutes from './routes/tutorRoutes';
import bookingRoutes from './routes/bookingRoutes';
import reviewRoutes from './routes/reviewRoutes';
import adminRoutes from './routes/adminRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './middleware/errorHandler';


const app = express();

// Root route for Vercel
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to SkillBridge API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      tutors: '/api/tutors',
      bookings: '/api/bookings',
      reviews: '/api/reviews',
      admin: '/api/admin',
      categories: '/api/categories'
    }
  });
});

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to SkillBridge API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      tutors: '/api/tutors',
      bookings: '/api/bookings',
      reviews: '/api/reviews',
      admin: '/api/admin',
      categories: '/api/categories'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SkillBridge API is running',
    timestamp: new Date().toISOString() 
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

export default app;
