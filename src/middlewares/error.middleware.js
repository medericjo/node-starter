// TODO: To add errors logger in app, user 'winston' package

export const errorHandler = (req, res, next, error) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  
  // Don't expose stack traces in production
  const stack = process.env.NODE_ENV === 'development' ? error.stack : undefined;
  
  res.status(status).json({
    status,
    message,
    stack
  });
};