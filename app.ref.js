import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Documentation
import { swaggerSpec } from './swagger.js';
import { apiReference } from '@scalar/express-api-reference';

// Middleware imports
import { errorHandler } from './src/middlewares/error.middleware.js';
import { customMiddleware } from './src/middlewares/custom.middleware.js';

// Routes
import userRoutes from './src/routes/user.route.js';
import healthRoutes from './src/routes/health.route.js';

// Config
import { config } from './src/config/env.config.js';
import logger from './src/config/logger.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet()); // Adds various HTTP security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Basic Middlewares
app.use(express.json({ limit: '10kb' })); // Body size limit
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // Request logging

// API Documentation
app.use(
  '/api-docs',
  apiReference({
    pageTitle: 'Node Starter API Reference',
    spec: {
      content: swaggerSpec,
    },
  })
);

// Custom middleware
app.use(customMiddleware);

// Health Check
app.use('/health', healthRoutes);

// API Routes
app.use('/api/users', userRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error Handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  app.close(() => {
    logger.info('Process terminated!');
  });
});

// Uncaught Exception Handler
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Unhandled Rejection Handler
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

const port = config.port;

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port} in ${config.nodeEnv} mode`);
});

export default server;