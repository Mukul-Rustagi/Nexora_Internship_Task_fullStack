/**
 * Error Handler Middleware
 * Centralized error handling for all API routes
 */

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Not Found Handler
 * Catches 404 errors for undefined routes
 */
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * Global Error Handler
 * Handles all errors passed via next(error)
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Default to 500 if no status code
  statusCode = statusCode || 500;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(", ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, please login again";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired, please login again";
  }

  // Log error for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", {
      message: err.message,
      stack: err.stack,
      statusCode,
    });
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
      stack: err.stack,
    }),
  });
};

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Validate Request Body
 * Middleware to validate required fields in request body
 */
const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(
      (field) => !req.body[field] || req.body[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    next();
  };
};

/**
 * Validate Request Params
 * Middleware to validate required params in request URL
 */
const validateParams = (requiredParams) => {
  return (req, res, next) => {
    const missingParams = requiredParams.filter(
      (param) => !req.params[param] || req.params[param] === ""
    );

    if (missingParams.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required parameters: ${missingParams.join(", ")}`,
      });
    }

    next();
  };
};

module.exports = {
  ApiError,
  notFound,
  errorHandler,
  asyncHandler,
  validateBody,
  validateParams,
};

