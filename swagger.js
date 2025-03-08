import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Starter API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);
