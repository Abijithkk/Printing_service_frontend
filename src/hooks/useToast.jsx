import toast from 'react-hot-toast';

/**
 * Custom hook for showing toast notifications
 * Usage: const { success, error, loading, custom } = useToast();
 */
export const useToast = () => {
  const success = (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      ...options,
    });
  };

  const error = (message, options = {}) => {
    return toast.error(message, {
      duration: 3000,
      ...options,
    });
  };

  const loading = (message, options = {}) => {
    return toast.loading(message, {
      ...options,
    });
  };

  const custom = (message, options = {}) => {
    return toast(message, {
      ...options,
    });
  };

  const dismiss = (toastId) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const promise = (promise, messages, options = {}) => {
    return toast.promise(promise, messages, {
      ...options,
    });
  };

  return {
    success,
    error,
    loading,
    custom,
    dismiss,
    promise,
  };
};

export default useToast;
