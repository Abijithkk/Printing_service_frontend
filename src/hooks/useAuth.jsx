import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../store/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = async (email, password) => {
    return dispatch(loginUser({ email, password }));
  };

  const logout = async () => {
    return dispatch(logoutUser());
  };

  return {
    user: auth.user,
    token: auth.token,
    isLoading: auth.isLoading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
