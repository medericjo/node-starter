import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Documentation
import swaggerSpec from './swagger.js';
import { apiReference } from '@scalar/express-api-reference';


// Custom middleware
import { customMiddleware } from './src/middlewares/custom.middleware.js';

// Routes
import userRoutes from './src/routes/user.route.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permit to read JSON
app.use(express.urlencoded({ extended: true })); // Permit to read URL encoded data

app.use(
  '/api-reference',
  apiReference({
    pageTitle: 'Node Starter API Reference',
    spec: {
      content: swaggerSpec,
    },
  })
);

app.use(customMiddleware);

// Routes
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
