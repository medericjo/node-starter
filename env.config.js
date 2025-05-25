import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['JWT_SECRET', 'NODE_ENV'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  dbConfig: {
    dialect: 'sqlite',
    storage: './src/database/database.sqlite',
  },
};
