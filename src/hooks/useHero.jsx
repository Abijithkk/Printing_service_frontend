import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createHero,
  deleteHero,
  getHero,
  updateHero,
  clearError,
} from '../store/slices/heroSlice';

const useHero = () => {
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.hero);

  const createHeroAction = useCallback(
    (formData) => {
      return dispatch(createHero(formData));
    },
    [dispatch],
  );

  const fetchHero = useCallback(() => {
    return dispatch(getHero());
  }, [dispatch]);

  const updateHeroAction = useCallback(
    ({ id, formData }) => {
      return dispatch(updateHero({ id, formData }));
    },
    [dispatch],
  );

  const deleteHeroAction = useCallback(
    (id) => {
      return dispatch(deleteHero(id));
    },
    [dispatch],
  );

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: hero.data,
    isLoading: hero.isLoading,
    error: hero.error,
    createHeroAction,
    fetchHero,
    updateHeroAction,
    deleteHeroAction,
    removeError,
  };
};

export default useHero;
