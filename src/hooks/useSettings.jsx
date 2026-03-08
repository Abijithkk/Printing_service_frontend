import { useDispatch, useSelector } from 'react-redux';
import {
  getSiteSettings,
  updateLogo,
  updateContact,
  updateFooter,
  addSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  clearError,
} from '../store/slices/settingsSlice';

const useSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const fetchSettings = () => {
    return dispatch(getSiteSettings());
  };

  const updateLogoAction = (formData) => {
    return dispatch(updateLogo(formData));
  };

  const updateContactAction = (contactData) => {
    return dispatch(updateContact(contactData));
  };

  const updateFooterAction = (footerData) => {
    return dispatch(updateFooter(footerData));
  };

  const addSocialMediaAction = (formData) => {
    return dispatch(addSocialMedia(formData));
  };

  const updateSocialMediaAction = (id, formData) => {
    return dispatch(updateSocialMedia({ id, formData }));
  };

  const deleteSocialMediaAction = (id) => {
    return dispatch(deleteSocialMedia(id));
  };

  const removeError = () => {
    dispatch(clearError());
  };

  return {
    data: settings.data,
    isLoading: settings.isLoading,
    error: settings.error,
    fetchSettings,
    updateLogoAction,
    updateContactAction,
    updateFooterAction,
    addSocialMediaAction,
    updateSocialMediaAction,
    deleteSocialMediaAction,
    removeError,
  };
};

export default useSettings;
