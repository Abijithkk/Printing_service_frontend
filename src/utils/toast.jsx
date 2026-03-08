import toast from 'react-hot-toast';

/**
 * Toast utility functions for common scenarios
 * Can be used directly without importing useToast hook
 */

export const toastShowSuccess = (message, options = {}) => {
  return toast.success(message, {
    duration: 3000,
    ...options,
  });
};

export const toastShowError = (message, options = {}) => {
  return toast.error(message, {
    duration: 3000,
    ...options,
  });
};

export const toastShowLoading = (message, options = {}) => {
  return toast.loading(message, {
    ...options,
  });
};

export const toastShowCustom = (message, options = {}) => {
  return toast(message, {
    ...options,
  });
};

export const toastDismiss = (toastId) => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};

export const toastPromise = (promise, messages, options = {}) => {
  return toast.promise(promise, messages, {
    ...options,
  });
};

/**
 * Common toast scenarios
 */

export const toastFieldError = (fieldName) => {
  return toast.error(`Please check ${fieldName}`);
};

export const toastValidationError = (
  message = 'Please fill all required fields',
) => {
  return toast.error(message);
};

export const toastOperationSuccess = (operationType = 'Operation') => {
  return toast.success(`${operationType} completed successfully!`);
};

export const toastOperationFailed = (operationType = 'Operation', error) => {
  const errorMessage =
    error?.message || error?.toString() || 'Something went wrong';
  return toast.error(`${operationType} failed: ${errorMessage}`);
};

export const toastNetworkError = () => {
  return toast.error('Network error. Please check your connection.');
};

export const toastServerError = (
  message = 'Server error. Please try again later.',
) => {
  return toast.error(message);
};

export const toastUnauthorized = (
  message = 'Session expired. Please login again.',
) => {
  return toast.error(message);
};

export const toastCopiedToClipboard = () => {
  return toast.success('Copied to clipboard!');
};

export const toastLoadingWithId = (message, options = {}) => {
  return toast.loading(message, { ...options });
};

export const toastUpdateLoading = (toastId, message) => {
  toast.loading(message, {
    id: toastId,
  });
};

export const toastUpdateSuccess = (toastId, message = 'Success!') => {
  toast.success(message, {
    id: toastId,
    duration: 3000,
  });
};

export const toastUpdateError = (toastId, message = 'Error!') => {
  toast.error(message, {
    id: toastId,
    duration: 3000,
  });
};

export default {
  toastShowSuccess,
  toastShowError,
  toastShowLoading,
  toastShowCustom,
  toastDismiss,
  toastPromise,
  toastFieldError,
  toastValidationError,
  toastOperationSuccess,
  toastOperationFailed,
  toastNetworkError,
  toastServerError,
  toastUnauthorized,
  toastCopiedToClipboard,
  toastLoadingWithId,
  toastUpdateLoading,
  toastUpdateSuccess,
  toastUpdateError,
};
