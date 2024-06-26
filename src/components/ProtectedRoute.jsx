import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Add loading spinner later
  }

  if (!user && !isLoading) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/sign" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
