import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribers, clearError } from '../store/slices/newsletterSlice';

const useNewsletter = () => {
  const dispatch = useDispatch();
  const newsletter = useSelector((state) => state.newsletter);

  const fetchSubscribers = useCallback(() => {
    return dispatch(getSubscribers());
  }, [dispatch]);

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: newsletter.data,
    isLoading: newsletter.isLoading,
    error: newsletter.error,
    fetchSubscribers,
    removeError,
  };
};

export default useNewsletter;

