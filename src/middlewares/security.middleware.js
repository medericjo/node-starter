import helmet from 'helmet';
import hpp from 'hpp';

export const securityMiddleware = [
  helmet(), // Adds various HTTP headers
  hpp(), // Protect against HTTP Parameter Pollution attacks
];