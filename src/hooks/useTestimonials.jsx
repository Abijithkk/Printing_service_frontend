import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
  clearError,
} from '../store/slices/testimonialsSlice';

const useTestimonials = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonials);

  const fetchTestimonials = useCallback(() => {
    return dispatch(getTestimonials());
  }, [dispatch]);

  const createTestimonialAction = useCallback(
    (payload) => {
      return dispatch(createTestimonial(payload));
    },
    [dispatch],
  );

  const updateTestimonialAction = useCallback(
    ({ id, payload }) => {
      return dispatch(updateTestimonial({ id, payload }));
    },
    [dispatch],
  );

  const deleteTestimonialAction = useCallback(
    (id) => {
      return dispatch(deleteTestimonial(id));
    },
    [dispatch],
  );

  const toggleTestimonialStatusAction = useCallback(
    (id) => {
      return dispatch(toggleTestimonialStatus(id));
    },
    [dispatch],
  );

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: testimonials.data,
    isLoading: testimonials.isLoading,
    error: testimonials.error,
    fetchTestimonials,
    createTestimonialAction,
    updateTestimonialAction,
    deleteTestimonialAction,
    toggleTestimonialStatusAction,
    removeError,
  };
};

export default useTestimonials;

