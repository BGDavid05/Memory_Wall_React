/**
 * Extracts error message from various error types
 * @param error - Unknown error object
 * @returns User-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (!error) {
    return 'An unknown error occurred';
  }

  // Handle API errors with response structure
  if (typeof error === 'object' && error !== null) {
    const apiError = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
      message?: string;
    };

    // Try to get message from API response
    if (apiError.response?.data?.message) {
      return apiError.response.data.message;
    }

    // Fall back to error message property
    if (apiError.message) {
      return apiError.message;
    }
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle Error instances
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
}

/**
 * Type guard to check if error is an API error
 */
export function isApiError(error: unknown): error is {
  response: {
    data: {
      message: string;
    };
  };
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as Record<string, unknown>).response === 'object' &&
    'data' in (error as Record<string, unknown>).response &&
    typeof (error as Record<string, unknown>).response.data === 'object' &&
    'message' in (error as Record<string, unknown>).response.data
  );
}
