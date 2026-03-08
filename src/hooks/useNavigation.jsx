import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNavigation,
  createNavigation,
  updateNavigation,
  deleteNavigation,
  reorderNavigation,
  toggleNavigationStatus,
  clearError,
} from '../store/slices/navigationSlice';

const useNavigation = () => {
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.navigation);

  const fetchNavigation = useCallback(() => {
    return dispatch(getNavigation());
  }, [dispatch]);

  const createNavigationAction = useCallback(
    (formData) => {
      return dispatch(createNavigation(formData));
    },
    [dispatch],
  );

  const updateNavigationAction = useCallback(
    ({ id, formData }) => {
      return dispatch(updateNavigation({ id, formData }));
    },
    [dispatch],
  );

  const deleteNavigationAction = useCallback(
    (id) => {
      return dispatch(deleteNavigation(id));
    },
    [dispatch],
  );

  const reorderNavigationAction = useCallback(
    (items) => {
      return dispatch(reorderNavigation(items));
    },
    [dispatch],
  );

  const toggleNavigationStatusAction = useCallback(
    (id) => {
      return dispatch(toggleNavigationStatus(id));
    },
    [dispatch],
  );

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: navigation.data,
    isLoading: navigation.isLoading,
    error: navigation.error,
    fetchNavigation,
    createNavigationAction,
    updateNavigationAction,
    deleteNavigationAction,
    reorderNavigationAction,
    toggleNavigationStatusAction,
    removeError,
  };
};

export default useNavigation;
