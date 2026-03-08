import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  toggleCategoryStatus,
  clearError,
} from '../store/slices/categoriesSlice';

const useCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const fetchCategories = useCallback(() => {
    return dispatch(getCategories());
  }, [dispatch]);

  const createCategoryAction = useCallback(
    (formData) => {
      return dispatch(createCategory(formData));
    },
    [dispatch],
  );

  const updateCategoryAction = useCallback(
    ({ id, formData }) => {
      return dispatch(updateCategory({ id, formData }));
    },
    [dispatch],
  );

  const deleteCategoryAction = useCallback(
    (id) => {
      return dispatch(deleteCategory(id));
    },
    [dispatch],
  );

  const reorderCategoriesAction = useCallback(
    (items) => {
      return dispatch(reorderCategories(items));
    },
    [dispatch],
  );

  const toggleCategoryStatusAction = useCallback(
    (id) => {
      return dispatch(toggleCategoryStatus(id));
    },
    [dispatch],
  );

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: categories.data,
    isLoading: categories.isLoading,
    error: categories.error,
    fetchCategories,
    createCategoryAction,
    updateCategoryAction,
    deleteCategoryAction,
    reorderCategoriesAction,
    toggleCategoryStatusAction,
    removeError,
  };
};

export default useCategories;

