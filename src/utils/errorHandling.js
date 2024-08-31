import { toast } from 'react-toastify'; 

export class AppError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
  }
}

export const handleError = (error, customMessage = null) => {
  console.error('Error:', error);

  let message = customMessage || 'An unexpected error occurred';
  let errorCode = 'UNKNOWN_ERROR';

  if (error instanceof AppError) {
    message = error.message;
    errorCode = error.code;
  } else if (error.code) {
    // Handle Firebase errors
    switch (error.code) {
      case 'permission-denied':
        message = 'You do not have permission to perform this action';
        errorCode = 'PERMISSION_DENIED';
        break;
      case 'not-found':
        message = 'The requested resource was not found';
        errorCode = 'NOT_FOUND';
        break;
      // Add more cases as needed
    }
  }

  toast.error(message);
  return { message, code: errorCode };
};

export const wrapAsync = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      return handleError(error);
    }
  };
};