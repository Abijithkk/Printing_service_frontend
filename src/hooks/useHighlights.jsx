import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHighlights,
  createHighlight,
  updateHighlight,
  deleteHighlight,
  reorderHighlights,
  toggleHighlightStatus,
  clearError,
} from '../store/slices/highlightsSlice';

const useHighlights = () => {
  const dispatch = useDispatch();
  const highlights = useSelector((state) => state.highlights);

  const fetchHighlights = useCallback(() => {
    return dispatch(getHighlights());
  }, [dispatch]);

  const createHighlightAction = useCallback(
    (formData) => {
      return dispatch(createHighlight(formData));
    },
    [dispatch],
  );

  const updateHighlightAction = useCallback(
    ({ id, formData }) => {
      return dispatch(updateHighlight({ id, formData }));
    },
    [dispatch],
  );

  const deleteHighlightAction = useCallback(
    (id) => {
      return dispatch(deleteHighlight(id));
    },
    [dispatch],
  );

  const reorderHighlightsAction = useCallback(
    (items) => {
      return dispatch(reorderHighlights(items));
    },
    [dispatch],
  );

  const toggleHighlightStatusAction = useCallback(
    (id) => {
      return dispatch(toggleHighlightStatus(id));
    },
    [dispatch],
  );

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: highlights.data,
    isLoading: highlights.isLoading,
    error: highlights.error,
    fetchHighlights,
    createHighlightAction,
    updateHighlightAction,
    deleteHighlightAction,
    reorderHighlightsAction,
    toggleHighlightStatusAction,
    removeError,
  };
};

export default useHighlights;

