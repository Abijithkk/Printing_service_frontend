import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeData, clearError } from '../store/slices/homeSlice';

const useHome = () => {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home);

  const fetchHomeData = useCallback(() => {
    return dispatch(getHomeData());
  }, [dispatch]);

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: home.data,
    isLoading: home.isLoading,
    error: home.error,
    fetchHomeData,
    removeError,
  };
};

export default useHome;

