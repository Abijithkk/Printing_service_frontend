import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const localToken = localStorage.getItem('authToken');
  const localUser = localStorage.getItem('adminUser');

  const hasValidSession =
    (isAuthenticated && token) || (localToken && localUser);

  if (!hasValidSession) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
