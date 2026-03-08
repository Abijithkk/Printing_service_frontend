import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  reorderServices,
  toggleServiceStatus,
  clearError,
} from '../store/slices/servicesSlice';

const useServices = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);

  const fetchServices = useCallback(() => {
    return dispatch(getServices());
  }, [dispatch]);

  const createServiceAction = useCallback(
    (formData) => {
      return dispatch(createService(formData));
    },
    [dispatch],
  );

  const updateServiceAction = useCallback(
    ({ id, formData }) => {
      return dispatch(updateService({ id, formData }));
    },
    [dispatch],
  );

  const deleteServiceAction = useCallback(
    (id) => {
      return dispatch(deleteService(id));
    },
    [dispatch],
  );

  const reorderServicesAction = useCallback(
    (items) => {
      return dispatch(reorderServices(items));
    },
    [dispatch],
  );

  const toggleServiceStatusAction = useCallback(
    (id) => {
      return dispatch(toggleServiceStatus(id));
    },
    [dispatch],
  );

  const removeError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data: services.data,
    isLoading: services.isLoading,
    error: services.error,
    fetchServices,
    createServiceAction,
    updateServiceAction,
    deleteServiceAction,
    reorderServicesAction,
    toggleServiceStatusAction,
    removeError,
  };
};

export default useServices;

