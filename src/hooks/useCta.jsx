import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCtas,
  createCta,
  updateCta,
  deleteCta,
  toggleCtaStatus,
  clearError,
} from '../store/slices/ctaSlice';

const useCta = () => {
  const dispatch = useDispatch();
  const cta = useSelector((state) => state.cta);

  const fetchCtas = useCallback(() => {
    return dispatch(getCtas());
  }, [dispatch]);

  const createCtaAction = useCallback(
    (payload) => {
      return dispatch(createCta(payload));
    },
    [dispatch],
  );

  const updateCtaAction = useCallback(
    ({ id, payload }) => {
      return dispatch(updateCta({ id, payload }));
    },
    [dispatch],
  );

  const deleteCtaAction = useCallback(
    (id) => {
      return dispatch(deleteCta(id));
    },
    [dispatch],
  );

  const toggleCtaStatusAction = useCallback(
    (id) => {
      return dispatch(toggleCtaStatus(id));
    },
    [dispatch],
  );

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: cta.data,
    isLoading: cta.isLoading,
    error: cta.error,
    fetchCtas,
    createCtaAction,
    updateCtaAction,
    deleteCtaAction,
    toggleCtaStatusAction,
    removeError,
  };
};

export default useCta;

