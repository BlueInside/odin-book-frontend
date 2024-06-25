import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
